import { BadRequestException } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'sessions', database: "sqlite" })
export class Session {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text')
    userId: string;

    @Column('text')
    tokenId: string;

    @Column('text')
    device: string;

    @Column('text')
    ip: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    private validateProps() {
        const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$|^\d{1,3}(?:\.\d{1,3}){0,2}$/;

        if (!ipRegex.test(this.ip))
            throw new BadRequestException('invalid IP address format');

    }

    @BeforeInsert()
    private async beforeInsertActions() {
        this.validateProps();
    }

    @BeforeUpdate()
    private beforeUpdateActions() {
        this.validateProps();
    }


}