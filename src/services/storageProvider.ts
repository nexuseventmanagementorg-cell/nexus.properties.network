import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export type StorageBucket = 'property-images' | 'verification-documents' | 'avatars';

export interface StorageUploadResult {
  url: string;
  path: string;
}

export interface StorageRetrieveResult {
  path: string;
  data: Blob;
}

export interface StorageProvider {
  upload(bucket: StorageBucket, fileName: string, data: Blob | File): Promise<StorageUploadResult>;
  retrieve(bucket: StorageBucket, path: string): Promise<StorageRetrieveResult>;
  remove(bucket: StorageBucket, path: string): Promise<void>;
}

const ensureStorage = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Production storage requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return getSupabaseClient().storage;
};

export const storageProvider: StorageProvider = {
  upload: async (bucket, fileName, data) => {
    const storage = ensureStorage();
    const { data: uploadData, error } = await storage.from(bucket).upload(fileName, data, { upsert: true, cacheControl: '3600' });
    if (error) throw error;
    const path = uploadData?.path || fileName;
    const { data: publicUrlData } = storage.from(bucket).getPublicUrl(path);
    return { url: publicUrlData.publicUrl, path };
  },
  retrieve: async (bucket, path) => {
    const storage = ensureStorage();
    const { data, error } = await storage.from(bucket).download(path);
    if (error) throw error;
    return { path, data };
  },
  remove: async (bucket, path) => {
    const storage = ensureStorage();
    const { error } = await storage.from(bucket).remove([path]);
    if (error) throw error;
  },
};
