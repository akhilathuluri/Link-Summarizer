import React from 'react';
import { AddLinkForm } from '../components/AddLinkForm';
import { LinkCard } from '../components/LinkCard';
import { useStore } from '../store/useStore';

export function DashboardPage() {
  const { links } = useStore();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <AddLinkForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Links</h2>
        {links.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No links added yet. Add your first link above!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}