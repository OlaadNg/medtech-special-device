import { useState } from 'react';
import { X, Save } from 'lucide-react';

const SKIP_FIELDS = ['id', 'created_date', 'updated_date', 'created_by_id'];

function FieldInput({ name, schema, value, onChange }) {
  const type = schema?.type;
  const enumValues = schema?.enum;
  const isArray = type === 'array';

  if (enumValues) {
    return (
      <select value={value ?? ''} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
        <option value="">— Select —</option>
        {enumValues.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    );
  }

  if (type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(!value)}
          className={`w-10 h-5 rounded-full transition-colors relative ${value ? 'bg-blue-600' : 'bg-slate-600'}`}>
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <span className="text-slate-400 text-sm">{value ? 'Yes' : 'No'}</span>
      </div>
    );
  }

  if (type === 'string' && (name.includes('description') || name.includes('body') || name.includes('solution') || name.includes('challenge') || name.includes('results') || name.includes('requirements') || name.includes('notes'))) {
    return (
      <textarea value={value ?? ''} onChange={e => onChange(e.target.value)} rows={4}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-y" />
    );
  }

  if (type === 'string' && schema?.format === 'date') {
    return (
      <input type="date" value={value ?? ''} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
    );
  }

  if (isArray) {
    const arrVal = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-2">
        {arrVal.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={typeof item === 'string' ? item : JSON.stringify(item)} onChange={e => {
              const next = [...arrVal];
              next[i] = e.target.value;
              onChange(next);
            }} className="flex-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
            <button type="button" onClick={() => onChange(arrVal.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 text-xs px-2">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...arrVal, ''])} className="text-blue-400 text-xs hover:underline">+ Add item</button>
      </div>
    );
  }

  if (type === 'number') {
    return (
      <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
    );
  }

  return (
    <input type="text" value={value ?? ''} onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
  );
}

export default function AdminEntityModal({ title, schema, data, onSave, onClose }) {
  const [form, setForm] = useState({ ...data });
  const [saving, setSaving] = useState(false);

  const fields = Object.entries(schema?.properties || {}).filter(([k]) => !SKIP_FIELDS.includes(k));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full sm:max-w-xl bg-slate-900 sm:border-l border-slate-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h3 className="text-white font-bold text-lg truncate pr-3">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white flex-shrink-0"><X size={20} /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
          {fields.map(([key, fieldSchema]) => (
            <div key={key}>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wide mb-1.5">
                {key.replace(/_/g, ' ')}
              </label>
              <FieldInput
                name={key}
                schema={fieldSchema}
                value={form[key]}
                onChange={val => setForm(prev => ({ ...prev, [key]: val }))}
              />
            </div>
          ))}
        </form>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-700 flex gap-3 flex-shrink-0">
          <button onClick={onClose} type="button" className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}