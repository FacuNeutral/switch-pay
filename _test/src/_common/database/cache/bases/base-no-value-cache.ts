import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, ConflictException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Cache } from "cache-manager";
import { parseMinutesToMs } from "src/_common/utils/calcs/parse-time";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class BaseNoValueCache {

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
    async exists(id: string) {
        try {
            const entity = await this.cacheManager.get(`${this.entityName}:${id}`);

            if (entity !== null) return false;

            this.logger.log(`Entity ${this.entityName} with ID ${id} retrieved from cache`);

            return true;
        } catch (error) { throw await this.baseHandleException(error); }
    }

    async create(id: string, ttlMinutes: number = 15): Promise<{ id: string, ttlMinutes: number }> {
        try {
            ttlMinutes = parseMinutesToMs(ttlMinutes);
            const existingEntity = await this.cacheManager.get(`${this.entityName}:${id}`);

            if (existingEntity === null) throw new ConflictException(`${this.entityName} with ID ${id} already exists in cache`);

            await this.cacheManager.set(`${this.entityName}:${id}`, null, ttlMinutes);
            this.logger.log(`${this.entityName} with ID ${id} created successfully in cache`);

            return { id, ttlMinutes };
        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    async updateTtl(id: string, ttlMinutes: number) {
        try {
            ttlMinutes = parseMinutesToMs(ttlMinutes);
            const entity = await this.cacheManager.get(`${this.entityName}:${id}`);
            if (!entity) throw new NotFoundException(`${this.entityName} with ID ${id} not found in cache`);

            await this.cacheManager.set(`${this.entityName}:${id}`, entity, ttlMinutes);

            this.logger.log(`${this.entityName} with ID ${id} TTL updated to ${ttlMinutes} seconds`);

            return { id, ttlMinutes };
        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    private async baseHandleException(error: any) {

        this.logger.error(`Internal error: ${error.message}`);

        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}