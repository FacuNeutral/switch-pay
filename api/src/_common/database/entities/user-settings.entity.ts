import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserSettings {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 'system' })
    theme: string;

    @Column({ type: 'json', nullable: true })
    searchHistory: string[];

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    //% Transforms & Checks

    @BeforeInsert()
    async beforeInsertActions() { }

    @BeforeUpdate()
    async beforeUpdateActions() { }

    //% Relations

    @OneToOne(() => User, (user) => user.settings)
    user: User;

}