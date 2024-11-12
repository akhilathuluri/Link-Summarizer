import React from 'react';
import { Trash2, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { scrapeContent } from '../utils/scraper';
import { summarizeContent } from '../utils/ai';
import toast from 'react-hot-toast';

export function LinkList() {
  const { links, settings, removeLink, updateLink, setProcessing, isProcessing } =
    useStore();

  const handleSummarize = async (id: string, url: string) => {
    if (!settings.apiKey) {
      toast.error('Please enter your API key first');
      return;
    }

    if (isProcessing) {
      toast.error('Please wait for the current process to complete');
      return;
    }

    const toastId = toast.loading('Analyzing content...');

    try {
      setProcessing(true);
      
      toast.loading('Extracting content...', { id: toastId });
      const content = await scrapeContent(url);
      
      toast.loading('Generating summary...', { id: toastId });
      const summary = await summarizeContent(settings.apiKey, content);
      
      updateLink(id, { content, summary });
      toast.success('Summary generated successfully', { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message, { id: toastId });
      console.error('Error:', message);
    } finally {
      setProcessing(false);
    }
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No links added yet. Add your first link above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div
          key={link.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {link.title}
              </h3>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                {link.url}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSummarize(link.id, link.url)}
                disabled={isProcessing}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 transition-colors"
                title={isProcessing ? 'Processing...' : 'Generate/Regenerate Summary'}
              >
                <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => removeLink(link.id)}
                className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                title="Delete Link"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          {link.summary ? (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Summary:
              </h4>
              <p className="whitespace-pre-wrap">{link.summary}</p>
            </div>
          ) : link.error ? (
            <div className="mt-4 flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{link.error}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}