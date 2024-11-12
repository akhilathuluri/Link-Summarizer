import React from 'react';
import { Trash2, RefreshCw, ExternalLink, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { scrapeContent } from '../utils/scraper';
import { summarizeContent } from '../utils/ai';
import { Link } from '../types';
import toast from 'react-hot-toast';

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const { settings, updateLink, removeLink, setProcessing, isProcessing } = useStore();

  const handleSummarize = async () => {
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
      const content = await scrapeContent(link.url);
      
      toast.loading('Generating summary...', { id: toastId });
      const summary = await summarizeContent(settings.apiKey, content);
      
      updateLink(link.id, { content, summary });
      toast.success('Summary generated successfully', { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message, { id: toastId });
      console.error('Error:', message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!link.summary) return;
    
    try {
      await navigator.clipboard.writeText(link.summary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success('Summary copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy summary');
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 ${isExpanded ? 'shadow-lg' : ''}`}>
      <button
        onClick={() => link.summary && setIsExpanded(!isExpanded)}
        className={`w-full p-4 text-left ${link.summary ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}`}
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
              onClick={(e) => e.stopPropagation()}
            >
              {link.url}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          {link.summary && (
            <div className="text-gray-500 dark:text-gray-400">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>

        {link.error && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{link.error}</p>
        )}
      </button>

      {isExpanded && link.summary && (
        <div className="px-4 pb-4">
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Summary</h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {link.summary}
            </p>
          </div>
        </div>
      )}

      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
        <button
          onClick={handleSummarize}
          disabled={isProcessing}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 transition-colors rounded"
          title={isProcessing ? 'Processing...' : 'Generate/Regenerate Summary'}
        >
          <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={() => removeLink(link.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors rounded"
          title="Delete Link"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}