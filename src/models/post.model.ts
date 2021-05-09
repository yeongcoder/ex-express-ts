import {
    BaseEntity,
	Column,
	CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
	PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn
} from "typeorm";
import { Length, IsEmail } from 'class-validator';
import UserModel from './user.model';

@Entity()
export default class Post extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Length(16)
    @Column()
    title!: string;
    
    @Column({ type: 'text' })
    desc!: string;

    @CreateDateColumn({ type: 'timestamp' })
    reg_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    mod_at!: Date;

    @ManyToOne((type) => UserModel, (user) => user.posts)
    //@JoinColumn()
    user!: UserModel | string;

}