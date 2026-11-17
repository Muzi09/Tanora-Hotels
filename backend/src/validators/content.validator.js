import pageDefaults from '../../../frontend/lib/cms/pageDefaults.json' with { type: 'json' };
import { z } from 'zod';

export const updateSectionSchema = z.object({
  content: z.record(z.any()),
  note: z.string().optional(),
});

// Page templates define the shape required by each public page component.
export function contentSchemaFor(template) {
  if (Array.isArray(template)) return z.array(contentSchemaFor(template[0]));
  if (template !== null && typeof template === 'object') {
    return z.object(Object.fromEntries(Object.entries(template).map(([key, value]) => [key, contentSchemaFor(value)]))).passthrough();
  }
  if (typeof template === 'string') return z.string();
  if (typeof template === 'number') return z.number();
  if (typeof template === 'boolean') return z.boolean();
  return z.any();
}

export function validatePageContent(req, res, next) {
  const template = pageDefaults[req.params.pageSlug]?.sections[req.params.sectionKey]?.content;
  if (!template) return next();
  const result = contentSchemaFor(template).safeParse(req.body.content);
  if (!result.success) {
    return res.status(400).json({ success: false, message: 'Page content is missing required fields or contains invalid values', errors: result.error.flatten() });
  }
  req.body.content = result.data;
  next();
}
