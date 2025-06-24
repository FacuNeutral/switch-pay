import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UserDto } from "src/_common/database/dtos/user.dto";
import { User } from "src/_common/database/entities/user.entity";
import { Repository } from "typeorm";


export class UserUpdateBuilder {


  private db_user: User;

  private afterLoadCallback?: (db_user: User, user: Partial<User>) => Promise<void>;
  private afterSaveCallback?: (user: User) => Promise<void>;

  constructor(
    private readonly repo: Repository<User>,
    private readonly handleException: (error: any) => Promise<void>,
    private user: Partial<UserDto>) {
    this.user = user;
  }

  /**
   * Optional callback function that is executed after a user entity is loaded from the database.
   *
   * @param db_user - The user entity as retrieved from the database (read-only).
   * @param user - The user object sent for update, can be used to apply additional changes.
   */
  onAfterLoad(callback: (db_user: User, user: User) => Promise<void>): this {
    this.afterLoadCallback = callback;
    return this;
  }

  /**
  * Optional callback function that is executed after a user entity is saved to the database.
  *
  * @param user - The user entity that has been saved.
  */
  onAfterSave(callback: (user: User) => Promise<void>): this {
    this.afterSaveCallback = callback;
    return this;
  }

  async save() {
    try {
      // 1. Load
      const db_user = await this.repo.findOneBy({ id: this.user.id });
      if (!db_user) throw new NotFoundException('User not found');
      this.db_user = db_user;

      // 2. After load
      if (this.afterLoadCallback) await this.afterLoadCallback(this.db_user, this.user);

      // 3. Merge and save
      const merged = this.repo.merge(this.db_user, this.user);
      const saved = await this.repo.save(merged);

      // 4. After save
      if (this.afterSaveCallback) await this.afterSaveCallback(saved);

      return saved;


    } catch (error) {

      await this.handleException(error);

    }
  }

}
