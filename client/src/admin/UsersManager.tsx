import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { api } from '../services/api';
import { User, UserRole } from '../types';

export const UsersManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'EDITOR' as UserRole });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUsers();
    setCurrentUser(api.getCurrentUser());
  }, []);

  const loadUsers = async () => {
    const list = await api.getUsers();
    setUsers(list);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      await api.createUser(formData);
      setMessage({ type: 'success', text: `Team member ${formData.name} created successfully.` });
      setIsModalOpen(false);
      setFormData({ name: '', email: '', role: 'EDITOR' });
      loadUsers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to create user' });
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      setMessage({ type: 'success', text: 'User role updated successfully.' });
      loadUsers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update role' });
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to remove team member "${userName}"?`)) return;
    try {
      await api.deleteUser(userId);
      setMessage({ type: 'success', text: `User ${userName} removed.` });
      loadUsers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete user' });
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'EDITOR':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'MEMBER':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E8E5DC] dark:border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
              Team Users & RBAC Hierarchy
            </h1>
          </div>
          <p className="text-xs font-mono text-[#7E8798]">
            Super Admin Controls • Manage publication access, roles, and administrative privileges.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFF] text-[#FAF9F5] dark:text-[#121212] text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add Team Member
          </button>
        )}
      </div>

      {/* Role Hierarchy Visualizer Banner */}
      <div className="mb-8 p-4 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
        <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#7E8798] mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" /> Role Permission Hierarchy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <span className="font-bold text-purple-600 dark:text-purple-400">SUPER ADMIN</span>
            <p className="text-[10px] text-[#7E8798] mt-1">Full system control, team user management, RBAC configuration.</p>
          </div>
          <div className="p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <span className="font-bold text-blue-600 dark:text-blue-400">ADMIN</span>
            <p className="text-[10px] text-[#7E8798] mt-1">Publish, pin, delete articles, manage categories & subscribers.</p>
          </div>
          <div className="p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <span className="font-bold text-amber-600 dark:text-amber-400">EDITOR</span>
            <p className="text-[10px] text-[#7E8798] mt-1">Create & edit draft articles, upload media assets.</p>
          </div>
          <div className="p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">MEMBER</span>
            <p className="text-[10px] text-[#7E8798] mt-1">Registered reader with saved articles & newsletter access.</p>
          </div>
          <div className="p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] rounded-sm">
            <span className="font-bold text-gray-600 dark:text-gray-400">READER</span>
            <p className="text-[10px] text-[#7E8798] mt-1">Public visitor browsing articles & newsletter archive.</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 mb-6 text-xs font-mono rounded-sm border flex items-center justify-between ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
            : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
          <button onClick={() => setMessage(null)} className="underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7E8798]" />
        <input
          type="text"
          placeholder="Filter team members by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] text-xs font-mono focus:outline-none focus:border-[#1A1A1A] dark:focus:border-[#ECECEC]"
        />
      </div>

      {/* Users Table */}
      <div className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E5DC] dark:border-[#262626] bg-[#F3F1EA] dark:bg-[#222222] text-[11px] font-mono text-[#7E8798] uppercase tracking-wider">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E5DC] dark:divide-[#262626] text-xs font-mono">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#F3F1EA]/50 dark:hover:bg-[#222222]/50 transition-colors">
                <td className="py-3.5 px-4 font-medium flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-[#E8E5DC] dark:border-[#333]" />
                  <div>
                    <div className="font-sans font-medium text-[#1A1A1A] dark:text-[#ECECEC]">{user.name}</div>
                    <div className="text-[10px] text-[#7E8798]">ID: {user.id}</div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#7E8798]">{user.email}</td>
                <td className="py-3.5 px-4">
                  {isSuperAdmin && user.id !== currentUser?.id ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded-sm border cursor-pointer ${getRoleBadge(user.role)}`}
                    >
                      <option value="SUPER_ADMIN">SUPER ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="MEMBER">MEMBER</option>
                      <option value="READER">READER</option>
                    </select>
                  ) : (
                    <span className={`inline-block text-[10px] font-mono font-bold px-2 py-1 rounded-sm border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                    <UserCheck className="w-3.5 h-3.5" /> Active
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {isSuperAdmin && user.id !== currentUser?.id && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-sm hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Remove User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] p-6 max-w-md w-full rounded-sm shadow-xl">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-[#ECECEC] mb-4">
              Add New Team Member
            </h2>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#7E8798] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#7E8798] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@techniccal.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#7E8798] uppercase tracking-wider mb-1">Assign Role Privilege</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full p-2.5 bg-[#F3F1EA] dark:bg-[#222] border border-[#E8E5DC] dark:border-[#333] focus:outline-none"
                >
                  <option value="EDITOR">EDITOR (Drafts & Media)</option>
                  <option value="ADMIN">ADMIN (Publish & Manage Categories)</option>
                  <option value="SUPER_ADMIN">SUPER ADMIN (Full System Controls)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E8E5DC] dark:border-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#7E8798] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFF] text-[#FAF9F5] dark:text-[#121212] font-semibold uppercase tracking-wider"
                >
                  Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
