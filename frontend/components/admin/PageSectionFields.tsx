"use client";

import React, { useId } from "react";
import ImageUploader from "./ImageUploader";

type FieldValue = string | number | boolean | FieldValue[] | { [key: string]: FieldValue };

function labelFor(key: string) {
  return key.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/^./, (char) => char.toUpperCase());
}

/** Render the page's structured content as editable fields, preserving its schema. */
export default function PageSectionFields({ value, template, onChange, label = "Content", fieldKey = "" }: {
  value: FieldValue;
  template: FieldValue;
  onChange: (value: FieldValue) => void;
  label?: string;
  fieldKey?: string;
}) {
  const id = useId();
  if (Array.isArray(value)) {
    const itemTemplate = Array.isArray(template) ? template[0] : undefined;
    return (
      <fieldset className="space-y-4 border border-gray-200 rounded p-3">
        <legend className="px-1 font-semibold text-sm">{label}</legend>
        {value.map((item, index) => (
          <div key={index} className="space-y-2 border-b border-gray-200 pb-4">
            <PageSectionFields value={item} template={itemTemplate ?? item} label={`${label} ${index + 1}`} fieldKey={fieldKey}
              onChange={(next) => onChange(value.map((entry, i) => i === index ? next : entry))} />
            <div className="flex gap-3">
              <button type="button" className="text-xs text-red-700" onClick={() => onChange(value.filter((_, i) => i !== index))}>Remove item</button>
              <button type="button" className="text-xs" disabled={index === 0} onClick={() => {
                const next = [...value];
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                onChange(next);
              }}>Move up</button>
            </div>
          </div>
        ))}
        {itemTemplate !== undefined && <button type="button" className="px-3 py-2 border border-gray-300 text-sm"
          onClick={() => onChange([...value, structuredClone(itemTemplate)])}>Add item</button>}
      </fieldset>
    );
  }
  if (typeof value === "object" && value !== null) {
    const defaults = typeof template === "object" && !Array.isArray(template) ? template : {};
    return <div className="space-y-4">{Object.entries(value).map(([key, item]) => (
      <PageSectionFields key={key} value={item} template={defaults?.[key] ?? item} fieldKey={key} label={labelFor(key)}
        onChange={(next) => onChange({ ...value, [key]: next })} />
    ))}</div>;
  }
  if (typeof value === "string" && /^(image\d*|src)$/.test(fieldKey)) {
    return <ImageUploader label={label} url={value} onUrlChange={onChange} />;
  }
  if (typeof value === "boolean") {
    return <label htmlFor={id} className="flex gap-2"><input id={id} type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
  }
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block">{label}</label>
      {typeof value === "string" && (/description|desc|text/i.test(fieldKey) || value.length > 120) ? (
        <textarea id={id} className="w-full px-3 py-2" rows={4} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input id={id} className="w-full px-3 py-2" type={typeof value === "number" ? "number" : "text"} value={String(value)}
          onChange={(event) => onChange(typeof value === "number" ? Number(event.target.value) : event.target.value)} />
      )}
    </div>
  );
}
