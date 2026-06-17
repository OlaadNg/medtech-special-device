import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import AdminEntityModal from './AdminEntityModal';

/**
 * Generic admin list/CRUD page for any entity.
 * Props:
 *   entityName: string - base44 entity name
 *   title: string - page heading
 *   displayField: string - field to show as the row title
 *   secondaryField: string - secondary label
 *   badgeField: string - field to show as a badge
 */
export default function AdminGenericList({ entityName, title, displayField = 'title', secondaryField, badgeField = 'status' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [schema, setSchema] = useState(null);

  const entity = base44.entities[entityName];

  const load = async () => {
    const data = await entity.list('-created_date', 200).catch(() => []);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    entity.schema().then(setSchema);
  }, [entityName]);

  const handleDelete = async (id) => {
    if (!confirm(`Delete this ${title.slice(0, -1)}?`)) return;
    await entity.delete(id);
    load();
  };

  const handleSave = async (data) => {
    if (editing?.id) {
      await entity.update(editing.id, data);
    } else {
      await entity.create(data);
    }
    setEditing(null);
    load();
  };

  const filtered = items.filter(item =>
    !search ||
    item[displayField]?.toLowerCase().includes(search.toLowerCase()) ||
    (secondaryField && item[secondaryField]?.toLowerCase().includes(search.toLowerCase()))
  );

  const badgeColors = {
    active: 'bg-green-500/20 text-green-400',
    published: 'bg-green-500/20 text-green-400',
    upcoming: 'bg-blue-500/20 text-blue-400',
    ongoing: 'bg-yellow-500/20 text-yellow-400',
    draft: 'bg-slate-500/30 text-slate-400',
    open: 'bg-blue-500/20 text-blue-400',
    new: 'bg-blue-500/20 text-blue-400',
    in_review: 'bg-yellow-500/20 text-yellow-400',
    in_progress: 'bg-yellow-500/20 text-yellow-400',
    resolved: 'bg-green-500/20 text-green-400',
    closed: 'bg-slate-500/30 text-slate-400',
    completed: 'bg-slate-500/30 text-slate-400',
    cancelled: 'bg-red-500/20 text-red-400',
    filled: 'bg-slate-500/30 text-slate-400',
    discontinued: 'bg-red-500/20 text-red-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-xl">{title} <span className="text-slate-500 text-base font-normal ml-1">({items.length})</span></h2>
        <button onClick={() => setEditing({})} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> Add New
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X size={14} className="text-slate-500" /></button>}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? <div className="p-8 text-center text-slate-500">Loading...</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Title</th>
                  {secondaryField && <th className="text-left px-5 py-3 hidden md:table-cell">Details</th>}
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Status</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Created</th>
                  <th className="px-5 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-3 text-white font-medium max-w-xs truncate">{item[displayField] || '(untitled)'}</td>
                    {secondaryField && <td className="px-5 py-3 text-slate-400 hidden md:table-cell max-w-xs truncate">{item[secondaryField]}</td>}
                    <td className="px-5 py-3 hidden lg:table-cell">
                      {item[badgeField] && (
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColors[item[badgeField]] || 'bg-slate-600/40 text-slate-400'}`}>
                          {item[badgeField]}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs hidden lg:table-cell">
                      {item.created_date ? new Date(item.created_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => setEditing(item)} className="text-slate-400 hover:text-blue-400 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing !== null && schema && (
        <AdminEntityModal
          title={editing.id ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}
          schema={schema}
          data={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}