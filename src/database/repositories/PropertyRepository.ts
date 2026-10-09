import { BaseRepository } from './BaseRepository';
import type { PropertyRecord } from '../../services/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';

export class PropertyRepository extends BaseRepository<PropertyRecord> {
  constructor() { super('nexus_db_properties'); }
  async findByCity(city: string): Promise<PropertyRecord[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseClient.from('properties').select('*').ilike('city', city);
      if (error) throw error;
      return (data || []).map((row: unknown) => this.mapDatabaseRow(row));
    }
    const properties = await this.findAll();
    return properties.filter((property) => property.city.toLowerCase() === city.toLowerCase());
  }
}

export const propertyRepository = new PropertyRepository();
