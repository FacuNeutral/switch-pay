// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
// import { hash } from 'bcrypt';

// @Entity({ name: 'users', database: "sqlite" })
// export class User {

//     @PrimaryGeneratedColumn("uuid")
//     id: string;

//     @Column('text', { unique: true })
//     alias: string;

//     @Column('text')
//     firstName: string;

//     @Column('text')
//     lastName: string;

//     @Column('text', { unique: true, nullable: true })
//     email: string;

//     @Column('text', { select: false })
//     password: string;

//     // @Column('number', { select: false })
//     // pinCode?: number;

//     // @Column('text', { unique: true, nullable: true, select: false })
//     // phoneNumber?: string;


//     @Column('text', { nullable: true })
//     photo?: string;

//     @CreateDateColumn({ select: false })
//     createdAt: Date;

//     @UpdateDateColumn({ select: false })
//     updatedAt: Date;

//     //% Transforms & Checks

//     private async hashPassword() {
//         this.password = await hash(this.password, 10);
//     }

// }