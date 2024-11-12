export interface Link {
  id: string;
  url: string;
  title: string;
  content?: string;
  summary?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

export interface UserSettings {
  apiKey: string;
  theme: 'light' | 'dark';
}