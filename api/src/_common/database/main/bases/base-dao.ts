import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { UpdateQueryBuilder } from "../dao/query-builders/update-query-builder";

@Injectable()
export class GenericOperationDao<T extends { id: any }> {

    private readonly entityName: string;
    protected readonly logger: Logger;

    constructor(
        private readonly repository: Repository<T>,
    ) {
        this.entityName = this.repository.metadata.name;
        this.logger = new Logger(`${this.entityName}Dao`);
    }


    //% Basic operations
    async find(id: string): Promise<T> {
        try {
            const user = await this.repository.findOneBy({ id } as any);
            if (!user) throw new BadRequestException(`${this.entityName} with ID ${id} not found`);

            this.logger.log(`User ID ${id} retrieved`);

            return user;

        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    update(id: string, newEntity: DeepPartial<T>) {
        const entity = { ...newEntity, id };

        return new UpdateQueryBuilder<T>(
            this.repository,
            entity,
            this.baseHandleException
        )
    }

    async softDelete(id: string): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) throw new BadRequestException(`${this.entityName} with ID ${id} not found`);

            this.logger.log(`${this.entityName} ID ${id} soft deleted successfully`);
        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.repository.delete(id);
            if (result.affected === 0) throw new BadRequestException(`${this.entityName} with ID ${id} not found`);

            this.logger.log(`${this.entityName} ID ${id} deleted successfully`);
        } catch (error) {
            throw await this.baseHandleException(error);
        }
    }

    private async baseHandleException(error: any) {

        if (error.code === "22P02")
            throw new ConflictException(`invalid ${this.entityName} ID format`);

        if (error instanceof HttpException) throw error;

        this.logger.error(`Internal error: ${error.message}`);
        throw new InternalServerErrorException("an unexpected error occurred while processing the request");

    }
}

//% Override methods
export class BaseDao<T extends { id: any }> extends GenericOperationDao<T> {

    constructor(
        repository: Repository<T>,
    ) {
        super(repository);
    }


    /**
     * @deprecated This method is restricted and should not be used.
     * Throws an error if called.
     */
    async delete(): Promise<void> {
        this.throwRestrictedMethodError();
    }

    private throwRestrictedMethodError() {
        throw new BadRequestException(
            `For security reasons, the use of this method is restricted. Please update your code to use GenericOperationDao instead of BaseDao.`
        );
    }
}
