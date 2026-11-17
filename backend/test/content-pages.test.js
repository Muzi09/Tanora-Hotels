import assert from 'node:assert/strict';
import { test } from 'node:test';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import { Admin } from '../src/models/Admin.js';
import { PageContent } from '../src/models/PageContent.js';
import { ContentService } from '../src/services/content.service.js';
import { signAccessToken } from '../src/utils/jwt.js';
import defaults from '../../frontend/lib/cms/pageDefaults.json' with { type: 'json' };

test('all content pages keep drafts private and scope publication to the selected page', async () => {
  const database = await MongoMemoryServer.create();
  let server;
  try {
    await mongoose.connect(database.getUri());
    const admin = await Admin.create({ name: 'Test Admin', email: 'cms-test@example.com', passwordHash: 'unused', role: 'superadmin', isActive: true });
    const token = signAccessToken({ id: admin._id });
    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve) => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}/api/content`;
    const request = (path, method = 'GET', body, authenticated = true) => fetch(`${base}/${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(authenticated ? { Authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    assert.equal((await request('unknown')).status, 404);
    assert.equal((await request('about/unknown', 'PUT', { content: {} })).status, 404);
    assert.equal((await request('about/heroBanner', 'PUT', { content: { heading: 'Incomplete' } })).status, 400);
    for (const [page, definition] of Object.entries(defaults)) {
      assert.equal((await request(`${page}?mode=draft`, 'GET', undefined, false)).status, 401);
      const publicPage = await (await request(page, 'GET', undefined, false)).json();
      assert.deepEqual(Object.keys(publicPage.sections).sort(), Object.keys(definition.sections).sort());
      for (const [section, { content }] of Object.entries(definition.sections)) {
        assert.equal((await request(`${page}/${section}/discard`, 'POST')).status, 200, 'unsaved edits can be discarded before the first draft');
        const updated = { ...content, heading: `Draft for ${page}/${section}` };
        assert.equal((await request(`${page}/${section}`, 'PUT', { content: updated }, false)).status, 401);
        assert.equal((await request(`${page}/${section}`, 'PUT', { content: updated })).status, 200);
        const published = await (await request(`${page}/${section}`, 'GET', undefined, false)).json();
        assert.deepEqual(published.data.content, content, 'first draft must not become published content');
        assert.equal(published.data.draftContent, undefined);
        assert.equal(published.data.versionHistory, undefined);
        const draft = await (await request(`${page}?mode=draft`)).json();
        assert.deepEqual(draft.sections[section].data, updated, 'saved draft must load on a fresh request');
      }
    }
    const aboutPublish = await (await request('about/publish-all', 'POST')).json();
    assert.equal(aboutPublish.data.publishedCount, Object.keys(defaults.about.sections).length);
    assert.equal((await ContentService.getHomePageContent({ pageSlug: 'dining' })).sections.heroBanner.data.heading, defaults.dining.sections.heroBanner.content.heading);
    assert.equal((await request('about/heroBanner/publish', 'POST')).status, 409);
    for (const page of Object.keys(defaults)) {
      if (page !== 'about') assert.equal((await request(`${page}/publish-all`, 'POST')).status, 200);
      const published = await (await request(page, 'GET', undefined, false)).json();
      for (const section of Object.keys(defaults[page].sections)) {
        assert.equal(published.sections[section].data.heading, `Draft for ${page}/${section}`);
        assert.equal((await request(`${page}/${section}`, 'PUT', { content: { ...published.sections[section].data, heading: 'Discard me' } })).status, 200);
        assert.equal((await request(`${page}/${section}/discard`, 'POST')).status, 200);
        const draft = await (await request(`${page}/${section}?mode=draft`)).json();
        assert.equal(draft.data.content.heading, `Draft for ${page}/${section}`);
        assert.equal(draft.data.isDraftModified, false);
      }
    }
    assert.equal(await PageContent.countDocuments({ pageSlug: 'home' }), 0);
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
    await database.stop();
  }
});
