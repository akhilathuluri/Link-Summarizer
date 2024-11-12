import React from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AddLinkForm() {
  const [url, setUrl] = React.useState('');
  const { addLink } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      await addLink(url);
      setUrl('');
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to summarize"
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Link
      </button>
    </form>
  );
}