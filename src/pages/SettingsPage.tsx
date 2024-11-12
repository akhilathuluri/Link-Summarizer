import React from 'react';
import { ApiKeyInput } from '../components/ApiKeyInput';

export function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
        <ApiKeyInput />
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2">About API Keys</h3>
          <div className="prose dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-400">
              To use the AI summarization feature, you'll need a Google Gemini API key.
              Your API key is stored securely in your browser's local storage and is never
              sent to our servers.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Visit the Google AI Studio to get your API key</li>
              <li>Store it securely in your settings</li>
              <li>Use it to generate summaries of your saved links</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}