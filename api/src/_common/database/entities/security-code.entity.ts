import { createRandomNumericCode } from 'src/_common/utils/generators/random-code';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { UserAction } from '../interfaces/user-action.interface';
import { hash } from 'bcrypt';


@Entity()
export class SecurityCode {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text')
    code: string;

    @Column({
        type: 'enum',
        enum: UserAction,
        enumName: 'user_action_type_enum',
    })
    userAction: UserAction;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "boolean", default: false })
    used: boolean;

    //% Initial Methods & Validations

    @BeforeInsert()
    private async beforeInsertActions() {
        this.code = await hash(this.code, 10);
    }

    @BeforeUpdate()
    private async beforeUpdateActions() {
        this.code = await hash(this.code, 10);
    }



    //% Relations

    @ManyToOne(() => User, user => user.securityCodes)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column('uuid')
    userId: string;
}