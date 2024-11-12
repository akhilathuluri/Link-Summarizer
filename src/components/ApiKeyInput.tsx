import React from 'react';
import { Key } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ApiKeyInput() {
  const { settings, setApiKey } = useStore();
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor="apiKey"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Google Gemini API Key
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Key className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={isVisible ? 'text' : 'password'}
          id="apiKey"
          value={settings.apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Enter your API key"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Your API key is stored locally and never leaves your browser.
      </p>
    </div>
  );
}