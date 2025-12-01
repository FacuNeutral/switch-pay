import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Cache } from "cache-manager";

import Logger from "@logger";
@Injectable()
export class BaseMemoryCache<T> {

    private readonly entityName: string;
    protected readonly cacheManager: Cache;
    protected readonly logger: Logger;


    constructor(
        entityName: string,
        cacheManager: Cache
    ) {
        this.entityName = entityName;
        this.cacheManager = cacheManager;
        this.logger = new Logger(`${this.entityName}MemoryCache`);
    }


    //% Basic operations
    async find(id: string): Promise<T> {
        try {
            const entity = await this.cacheManager.get<T>(`${this.entityName}:${id}`);
            if (!entity) throw new NotFoundException(`${this.entityName} with ID ${id} not found in cache`);


            this.logger.verbose(`Entity ${this.entityName} with ID ${id} retrieved from cache`);
            return entity;
        } catch (error) { throw await this.baseHandleException(error); }
    }

    async create(id: string, ttlSeconds: number = 3600, entity: Partial<T>): Promise<Partial<T>> {
        try {
            const existingEntity = await this.cacheManager.get<T>(`${this.entityName}:${id}`);
            if (existingEntity) throw new ConflictException(`${this.entityName} with ID ${id} already exists in cache`);

            await this.cacheManager.set(`${this.entityName}:${id}`, entity, ttlSeconds);
            this.logger.verbose(`${this.entityName} with ID ${id} created successfully in cache`);

            return entity;
        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    async update(id: string, newEntity: Partial<T>) {
        const entity = await this.cacheManager.get<T>(id);
        if (!entity) throw new NotFoundException(`${this.entityName} with ID ${id} not found in cache`);

        const updatedEntity = { ...entity, ...newEntity };

        await this.cacheManager.set(id, updatedEntity);

        this.logger.verbose(`${this.entityName} with ID ${id} updated successfully in cache`);

        return updatedEntity;
    }


    private async baseHandleException(error: any) {

        this.logger.error(`Internal error: ${error.message}`);

        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}

// //% Override methods
// export class BaseDao<T extends { id: any }> extends GenericOperationDao<T> {

//     constructor(
//         repository: Repository<T>,
//     ) {
//         super(repository);
//     }


//     /**
//      * @deprecated This method is restricted and should not be used.
//      * Throws an error if called.
//      */
//     async delete(): Promise<void> {
//         this.throwRestrictedMethodError();
//     }

//     private throwRestrictedMethodError() {
//         throw new BadRequestException(
//             `For security reasons, the use of this method is restricted. Please update your code to use GenericOperationDao instead of BaseDao.`
//         );
//     }
// }
