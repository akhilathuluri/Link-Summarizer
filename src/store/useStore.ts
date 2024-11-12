import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Link, UserSettings } from '../types';

interface State {
  links: Link[];
  settings: UserSettings;
  isProcessing: boolean;
  addLink: (url: string) => Promise<void>;
  removeLink: (id: string) => void;
  updateLink: (id: string, data: Partial<Link>) => void;
  setApiKey: (key: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setProcessing: (status: boolean) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      links: [],
      settings: {
        apiKey: '',
        theme: 'light',
      },
      isProcessing: false,
      addLink: async (url: string) => {
        const id = crypto.randomUUID();
        const timestamp = Date.now();
        
        set((state) => ({
          links: [
            {
              id,
              url,
              title: url,
              createdAt: timestamp,
              updatedAt: timestamp,
            },
            ...state.links,
          ],
        }));
      },
      removeLink: (id: string) => {
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));
      },
      updateLink: (id: string, data: Partial<Link>) => {
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? { ...link, ...data, updatedAt: Date.now() }
              : link
          ),
        }));
      },
      setApiKey: (apiKey: string) => {
        set((state) => ({
          settings: { ...state.settings, apiKey },
        }));
      },
      setTheme: (theme: 'light' | 'dark') => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },
      setProcessing: (status: boolean) => {
        set({ isProcessing: status });
      },
    }),
    {
      name: 'link-manager-storage',
    }
  )
);