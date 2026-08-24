import React, { useEffect, useState } from 'react';
import { Download, Trash2, Mail, Users, CheckCircle } from 'lucide-react';
import { Subscriber } from '../types';
import { api } from '../services/api';

export const NewsletterManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    const data = await api.getSubscribers();
    setSubscribers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, email: string) => {
    if (window.confirm(`Unsubscribe ${email}?`)) {
      await api.deleteSubscriber(id);
      loadSubscribers();
    }
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email,SubscribedAt,Status", ...subscribers.map(s => `${s.email},${s.subscribedAt},${s.status}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aether_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Newsletter Subscribers</h1>
          <p className="text-xs font-mono text-[#9E9A8E] mt-1">READERSHIP AUDIENCE & DISPATCH SUBSCRIBERS</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-2 hover:opacity-90 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Subscriber Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <span className="text-[10px] font-mono text-[#9E9A8E] uppercase block mb-1">Active Subscribers</span>
          <p className="font-serif text-3xl font-bold">{subscribers.length}</p>
        </div>
        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <span className="text-[10px] font-mono text-[#9E9A8E] uppercase block mb-1">Growth Rate</span>
          <p className="font-serif text-3xl font-bold text-green-600">+14.2%</p>
        </div>
        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <span className="text-[10px] font-mono text-[#9E9A8E] uppercase block mb-1">Avg. Open Rate</span>
          <p className="font-serif text-3xl font-bold">58.4%</p>
        </div>
      </div>

      {/* Subscriber Table */}
      <div className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E5DC] dark:border-[#262626] text-[10px] font-mono text-[#9E9A8E] uppercase">
              <th className="p-4">Subscriber Email</th>
              <th className="p-4">Subscription Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F1EA] dark:divide-[#222222] text-xs">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-[#F3F1EA]/50 dark:hover:bg-[#222222]/50">
                <td className="p-4 font-mono font-medium">{sub.email}</td>
                <td className="p-4 font-mono text-[#9E9A8E]">{sub.subscribedAt}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-green-500/10 text-green-600 font-semibold uppercase">
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(sub.id, sub.email)}
                    className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                    title="Remove Subscriber"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
