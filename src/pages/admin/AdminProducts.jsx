import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import AdminEntityModal from './AdminEntityModal';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // null=closed, {}=new, item=edit
  const [schema, setSchema] = useState(null);

  const load = async () => {
    const data = await base44.entities.Product.list('-created_date', 200);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    base44.entities.Product.schema().then(setSchema);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await base44.entities.Product.delete(id);
    load();
  };

  const handleSave = async (data) => {
    if (editing?.id) {
      await base44.entities.Product.update(editing.id, data);
    } else {
      await base44.entities.Product.create(data);
    }
    setEditing(null);
    load();
  };

  const filtered = items.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-xl">Products <span className="text-slate-500 text-base font-normal ml-1">({items.length})</span></h2>
        <button onClick={() => setEditing({})} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> Add Product
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X size={14} className="text-slate-500" /></button>}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? <div className="p-8 text-center text-slate-500">Loading...</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">SKU</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Status</th>
                  <th className="px-5 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-5 py-3 text-slate-400 hidden md:table-cell">{p.category}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs hidden lg:table-cell">{p.sku}</td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/40 text-slate-400'}`}>
                        {p.status || 'active'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => setEditing(p)} className="text-slate-400 hover:text-blue-400 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500">No products found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing !== null && schema && (
        <AdminEntityModal title={editing.id ? 'Edit Product' : 'Add Product'} schema={schema} data={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}