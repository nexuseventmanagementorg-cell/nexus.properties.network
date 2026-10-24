import { readStore, writeStore } from '../../services/storageAdapter';
import { assertUuid, createUuid } from '../../services/uuid';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';
import type { BaseRecord } from '../schemas/models';

const camelToSnake = (value: string) => value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
const snakeToCamel = (value: string) => value.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());

const mapRow = <T,>(row: Record<string, unknown>): T => {
  const mapped: Record<string, unknown> = {};
  Object.entries(row).forEach(([key, value]) => {
    mapped[snakeToCamel(key)] = value;
  });
  return mapped as T;
};

const toRow = (value: unknown): Record<string, unknown> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Database returned a row with an invalid shape.');
  }
  return value as Record<string, unknown>;
};

const mapInput = (value: Record<string, unknown>) => {
  const mapped: Record<string, unknown> = {};
  Object.entries(value).forEach(([key, item]) => {
    if (item !== undefined) mapped[camelToSnake(key)] = item;
  });
  return mapped;
};

const validateUuidReferences = (value: Record<string, unknown>) => {
  Object.entries(value).forEach(([field, reference]) => {
    if (field === 'auditId' || reference === undefined || reference === null) return;
    if (/Id$/.test(field)) assertUuid(reference, field);
    if (/Ids$/.test(field)) {
      if (!Array.isArray(reference)) throw new Error(`${field} must contain UUID values.`);
      reference.forEach((id) => assertUuid(id, field));
    }
  });
};

export class BaseRepository<T extends BaseRecord> {
  constructor(protected readonly storageKey: string) {}

  protected mapDatabaseRow(row: unknown): T {
    return mapRow<T>(toRow(row));
  }

  protected getTableName() {
    return this.storageKey.replace(/^nexus_db_/, '');
  }

  protected mapDatabaseInput(value: Record<string, unknown>) {
    return mapInput(value);
  }

  async findAll(): Promise<T[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from(this.getTableName()).select('*');
      if (error) throw error;
      return (data || []).map((row: unknown) => this.mapDatabaseRow(row));
    }

    return readStore<T[]>(this.storageKey, []);
  }

  async findById(id: string): Promise<T | undefined> {
    if (isSupabaseConfigured) {
      assertUuid(id, 'id');
      const { data, error } = await supabaseClient.from(this.getTableName()).select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data ? this.mapDatabaseRow(data) : undefined;
    }

    return this.findAll().then((items) => items.find((record) => record.id === id));
  }

  async findByOwner(ownerId: string): Promise<T[]> {
    if (isSupabaseConfigured) {
      assertUuid(ownerId, 'ownerId');
      const { data, error } = await supabaseClient.from(this.getTableName()).select('*').eq('owner_id', ownerId);
      if (error) throw error;
      return (data || []).map((row: unknown) => this.mapDatabaseRow(row));
    }

    return this.findAll().then((items) => items.filter((record) => record.ownerId === ownerId));
  }

  async save(input: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'auditId'> & Partial<Pick<T, 'id' | 'createdAt' | 'updatedAt' | 'auditId'>>): Promise<T> {
    const now = new Date().toISOString();
    const id = isSupabaseConfigured
      ? input.id === undefined ? createUuid() : input.id
      : input.id || createUuid();
    if (isSupabaseConfigured) {
      assertUuid(id, 'id');
      validateUuidReferences(input as Record<string, unknown>);
    }
    const record = { ...input, id, createdAt: input.createdAt || now, updatedAt: now, auditId: input.auditId || `AUD-${Date.now()}` } as T;

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from(this.getTableName()).insert(this.mapDatabaseInput(record as Record<string, unknown>)).select('*').single();
      if (error) throw error;
      return this.mapDatabaseRow(data);
    }

    const existing = readStore<T[]>(this.storageKey, []);
    writeStore(this.storageKey, [...existing, record]);
    return record;
  }

  async update(id: string, patch: Partial<T>): Promise<T | undefined> {
    if (isSupabaseConfigured) {
      assertUuid(id, 'id');
      validateUuidReferences(patch as Record<string, unknown>);
    }
    const current = await this.findById(id);
    if (!current) return undefined;

    const updated = { ...current, ...patch, id, updatedAt: new Date().toISOString() } as T;

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from(this.getTableName()).update(this.mapDatabaseInput({ ...patch, id: undefined, updatedAt: updated.updatedAt } as Record<string, unknown>)).eq('id', id).select('*').single();
      if (error) throw error;
      return this.mapDatabaseRow(data);
    }

    const list = readStore<T[]>(this.storageKey, []);
    const next = list.map((record) => record.id === id ? updated : record);
    writeStore(this.storageKey, next);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      assertUuid(id, 'id');
      const { error } = await supabaseClient.from(this.getTableName()).delete().eq('id', id);
      if (error) throw error;
      return;
    }

    const list = readStore<T[]>(this.storageKey, []);
    writeStore(this.storageKey, list.filter((record) => record.id !== id));
  }
}
