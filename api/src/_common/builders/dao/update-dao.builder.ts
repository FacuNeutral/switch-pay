import { NotFoundException } from "@nestjs/common";
import { Repository, DeepPartial } from "typeorm";

export class UpdateDaoBuilder<T extends { id: any }> {

  private db_entity: T;

  private afterLoadCallback?: (db_entity: T, entity: DeepPartial<T>) => Promise<void>;
  private afterSaveCallback?: (entity: T) => Promise<void>;

  constructor(
    private readonly repo: Repository<T>,
    private readonly handleException: (error: any) => Promise<void>,
    private entity: DeepPartial<T>
  ) {
    this.entity = entity;
  }

  /**
   * Optional callback function that is executed after an entity is loaded from the database.
   *
   * @param db_entity - The entity as retrieved from the database (read-only).
   * @param entity - The object sent for update, can be used to apply additional changes.
   */
  onAfterLoad(callback: (db_entity: T, entity: DeepPartial<T>) => Promise<void>): this {
    this.afterLoadCallback = callback;
    return this;
  }

  /**
   * Optional callback function that is executed after an entity is saved to the database.
   *
   * @param entity - The entity that has been saved.
   */
  onAfterSave(callback: (entity: T) => Promise<void>): this {
    this.afterSaveCallback = callback;
    return this;
  }

  async save() {
    try {
      // 1. Load
      const db_entity = await this.repo.findOneBy({ id: this.entity.id } as any);
      if (!db_entity) throw new NotFoundException('Entity not found');
      this.db_entity = db_entity;

      // 2. After load
      if (this.afterLoadCallback) await this.afterLoadCallback(this.db_entity, this.entity);

      // 3. Merge and save
      const merged = this.repo.merge(this.db_entity, this.entity);
      const saved = await this.repo.save(merged);

      // 4. After save
      if (this.afterSaveCallback) await this.afterSaveCallback(saved);

      return saved;

    } catch (error) {
      await this.handleException(error);
    }
  }
}
