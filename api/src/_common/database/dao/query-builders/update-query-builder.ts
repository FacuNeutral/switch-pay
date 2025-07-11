import { NotFoundException } from "@nestjs/common";
import { Repository, DeepPartial } from "typeorm";

export class UpdateQueryBuilder<T extends { id: any }> {

  private db_entity: T;

  private afterLoadCallback?: (db_entity: T, newEntity: DeepPartial<T>) => Promise<void>;
  private afterSaveCallback?: (newEntity: T) => Promise<void>;

  constructor(
    private readonly repo: Repository<T>,
    private newEntity: DeepPartial<T>,
    private readonly handleException: (error: any) => Promise<void>,
  ) {
    this.newEntity = newEntity;
  }

  /**
   * Optional callback function that is executed after an entity is loaded from the database.
   *
   * @param db_entity - The entity as retrieved from the database (read-only).
   * @param newEntity - The object sent for update, can be used to apply additional changes.
   */
  onAfterLoad(callback: (db_entity: T, newEntity: DeepPartial<T>) => Promise<void>): this {
    this.afterLoadCallback = callback;
    return this;
  }

  /**
   * Optional callback function that is executed after an entity is saved to the database.
   *
   * @param newEntity - The entity that has been saved.
   */
  onAfterSave(callback: (newEntity: T) => Promise<void>): this {
    this.afterSaveCallback = callback;
    return this;
  }

  async save() {
    try {
      // 1. Load
      const db_entity = await this.repo.findOneBy({ id: this.newEntity.id } as any);
      const entityName = this.repo.metadata.name;
      if (!db_entity) throw new NotFoundException(`${entityName} with ID "${this.newEntity.id}" not found.`);
      this.db_entity = db_entity;


      // 2. After load
      if (this.afterLoadCallback) await this.afterLoadCallback(this.db_entity, this.newEntity);

      // 3. Merge and save
      const merged = this.repo.merge(this.db_entity, this.newEntity);
      const saved = await this.repo.save(merged);

      // 4. After save
      if (this.afterSaveCallback) await this.afterSaveCallback(saved);

      return saved;

    } catch (error) {
      if (this.handleException) await this.handleException(error);
      else throw error;
    }
  }
}
