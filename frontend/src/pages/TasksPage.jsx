import { useState, useEffect } from 'react';
import { taskApi } from '../api/taskApi';
import { useNotification } from '../contexts/NotificationContext';
import { Plus, Search, Filter, Check, Trash2, Edit3, RotateCcw, AlertCircle } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['todo', 'in_progress', 'completed'];
const CATEGORIES = ['Academic', 'Work', 'Personal', 'Fitness', 'Health', 'Other'];
const priorityColor = { low: 'green', medium: 'amber', high: 'red' };
const statusLabel = { todo: 'To Do', in_progress: 'In Progress', completed: 'Done' };

const EMPTY_FORM = { title: '', description: '', deadline: '', priority: 'medium', category: 'Personal', status: 'todo', recurring: false, estimatedDuration: '' };

export default function TasksPage() {
  const { addToast } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError(null);
    try { setTasks(await taskApi.getTasks()); }
    catch { setError('Unable to load your tasks.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditTask(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (task) => { setEditTask(task); setForm({ ...task }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { addToast({ title: 'Missing title', message: 'Please enter a task title.', type: 'warning' }); return; }
    setSaving(true);
    try {
      if (editTask) {
        const updated = await taskApi.updateTask(editTask.id, form);
        setTasks((prev) => prev.map((t) => t.id === editTask.id ? updated : t));
        addToast({ title: 'Task updated', type: 'success' });
      } else {
        const created = await taskApi.createTask(form);
        setTasks((prev) => [created, ...prev]);
        addToast({ title: 'Task added', message: `"${form.title}" is ready.`, type: 'success' });
      }
      setShowModal(false);
    } catch { addToast({ title: 'Error', message: 'Could not save task.', type: 'error' }); }
    finally { setSaving(false); }
  };

  const handleComplete = async (task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      await taskApi.updateTask(task.id, { status: newStatus });
      setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, status: newStatus } : t));
      if (newStatus === 'completed') addToast({ title: '+10 ATHENA Points!', message: `"${task.title}" completed!`, type: 'success' });
    } catch { addToast({ title: 'Error', type: 'error' }); }
  };

  const handleDelete = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      addToast({ title: 'Task removed', type: 'info' });
    } catch { addToast({ title: 'Error', type: 'error' }); }
  };

  const filtered = tasks.filter((t) => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  const today = filtered.filter((t) => t.deadline && new Date(t.deadline).toDateString() === new Date().toDateString());
  const upcoming = filtered.filter((t) => t.deadline && new Date(t.deadline) > new Date() && new Date(t.deadline).toDateString() !== new Date().toDateString());
  const completed = filtered.filter((t) => t.status === 'completed');
  const other = filtered.filter((t) => !t.deadline && t.status !== 'completed');

  const TaskCard = ({ task }) => (
    <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <button onClick={() => handleComplete(task)} style={{
        width: 22, height: 22, borderRadius: 7, border: `2px solid ${task.status === 'completed' ? '#4ade80' : 'rgba(255,255,255,0.2)'}`,
        background: task.status === 'completed' ? 'rgba(34,197,94,0.15)' : 'transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
      }}>
        {task.status === 'completed' && <Check size={12} color="#4ade80" />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: task.status === 'completed' ? '#64748b' : '#f1f5f9', fontWeight: 600, fontSize: 14, textDecoration: task.status === 'completed' ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</p>
        {task.description && <p style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{task.description}</p>}
        <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant={priorityColor[task.priority]}>{task.priority}</Badge>
          {task.category && <span style={{ color: '#475569', fontSize: 11 }}>{task.category}</span>}
          {task.deadline && <span style={{ color: '#475569', fontSize: 11 }}>📅 {new Date(task.deadline).toLocaleDateString()}</span>}
          {task.estimatedDuration && <span style={{ color: '#475569', fontSize: 11 }}>⏱ {task.estimatedDuration}min</span>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button onClick={() => openEdit(task)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, borderRadius: 6 }}><Edit3 size={14} /></button>
        <button onClick={() => handleDelete(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, borderRadius: 6 }}><Trash2 size={14} /></button>
      </div>
    </div>
  );

  const Section = ({ title, items }) => items.length === 0 ? null : (
    <div style={{ marginBottom: 24 }}>
      <p style={{ color: '#64748b', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{title} ({items.length})</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((t) => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>Tasks & Assignments</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{tasks.filter((t) => t.status !== 'completed').length} pending · {tasks.filter((t) => t.status === 'completed').length} completed</p>
        </div>
        <button onClick={openAdd} className="athena-btn-primary"><Plus size={15} /> New Task</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input className="athena-input" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <select className="athena-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
        </select>
        <select className="athena-select" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Priority</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
        </select>
      </div>

      {loading && <LoadingSpinner fullPage />}
      {error && <EmptyState icon={AlertCircle} title="Load failed" message={error} action={load} actionLabel="Try Again" />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No tasks found" message="Add your first task to get started." action={openAdd} actionLabel="Add Task" />
      )}

      {!loading && !error && (
        <>
          <Section title="Due Today" items={today} />
          <Section title="No Deadline" items={other} />
          <Section title="Upcoming" items={upcoming} />
          <Section title="Completed" items={completed} />
        </>
      )}

      {/* Task modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editTask ? 'Edit Task' : 'New Task'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><label className="athena-label">Title *</label><input className="athena-input" placeholder="Task title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
          <div><label className="athena-label">Description</label><textarea className="athena-input" placeholder="Optional description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} style={{ resize: 'vertical' }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="athena-label">Deadline</label><input type="date" className="athena-input" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))} /></div>
            <div><label className="athena-label">Est. duration (min)</label><input type="number" className="athena-input" placeholder="60" value={form.estimatedDuration} onChange={(e) => setForm((p) => ({ ...p, estimatedDuration: e.target.value }))} /></div>
            <div>
              <label className="athena-label">Priority</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {PRIORITIES.map((p) => {
                  const colors = { low: '#4ade80', medium: '#fbbf24', high: '#f87171' };
                  return <button key={p} onClick={() => setForm((prev) => ({ ...prev, priority: p }))} style={{ flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize', background: form.priority === p ? `rgba(${p === 'high' ? '248,113,113' : p === 'medium' ? '251,191,36' : '74,222,128'},0.1)` : 'rgba(255,255,255,0.04)', border: `1px solid ${form.priority === p ? colors[p] + '55' : 'rgba(255,255,255,0.08)'}`, color: form.priority === p ? colors[p] : '#64748b', transition: 'all 0.2s' }}>{p}</button>;
                })}
              </div>
            </div>
            <div><label className="athena-label">Category</label><select className="athena-select" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="athena-label">Status</label><select className="athena-select" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>{STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}</select></div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" className="athena-checkbox" checked={form.recurring} onChange={(e) => setForm((p) => ({ ...p, recurring: e.target.checked }))} />
            <span style={{ color: '#94a3b8', fontSize: 13 }}>Recurring / daily task</span>
          </label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
            <button onClick={() => setShowModal(false)} className="athena-btn-secondary">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="athena-btn-primary">{saving ? <LoadingSpinner size={16} /> : editTask ? 'Update' : 'Add Task'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
