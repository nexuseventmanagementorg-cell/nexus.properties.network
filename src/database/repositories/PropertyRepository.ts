import { BaseRepository } from './BaseRepository';
import type { PropertyRecord } from '../../services/models';
import { isSupabaseConfigured, supabaseClient } from '../../services/supabaseClient';
import { assertUuid } from '../../services/uuid';

export class PropertyRepository extends BaseRepository<PropertyRecord> {
  constructor() { super('nexus_db_properties'); }

  protected mapDatabaseRow(row: unknown): PropertyRecord {
    const property = super.mapDatabaseRow(row);
    return { ...property, propertyId: property.id };
  }

  protected mapDatabaseInput(value: Record<string, unknown>) {
    const { propertyId: _propertyId, ...databaseValues } = value;
    return super.mapDatabaseInput(databaseValues);
  }

  async save(input: Parameters<BaseRepository<PropertyRecord>['save']>[0]): Promise<PropertyRecord> {
    if (isSupabaseConfigured) {
      if (!input.id) {
        throw new Error('A property UUID primary key must be supplied explicitly.');
      }
      assertUuid(input.id, 'property.id');
      if (input.propertyId !== input.id) {
        throw new Error('Property propertyId must match its UUID primary key id.');
      }
      if (input.ownerId !== undefined) assertUuid(input.ownerId, 'property.ownerId');
      if (input.cityId !== undefined) assertUuid(input.cityId, 'property.cityId');
      if (input.areaId !== undefined) assertUuid(input.areaId, 'property.areaId');
    }
    return super.save(input);
  }

  async update(id: string, patch: Partial<PropertyRecord>): Promise<PropertyRecord | undefined> {
    if (isSupabaseConfigured) {
      assertUuid(id, 'property.id');
      if (patch.propertyId !== undefined && patch.propertyId !== id) {
        throw new Error('Property propertyId must match its UUID primary key id.');
      }
      if (patch.ownerId !== undefined) assertUuid(patch.ownerId, 'property.ownerId');
      if (patch.cityId !== undefined) assertUuid(patch.cityId, 'property.cityId');
      if (patch.areaId !== undefined) assertUuid(patch.areaId, 'property.areaId');
    }
    const { propertyId: _propertyId, ...databasePatch } = patch;
    return super.update(id, databasePatch);
  }

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
