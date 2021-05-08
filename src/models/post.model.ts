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

    @ManyToOne((type) => UserModel)
    @JoinColumn()
    @Column({ type: 'text' })
    user_id!: UserModel | string;

    @Length(16)
    @Column({ type: 'text' })
    title!: string;
    
    @Column({ type: 'text' })
    desc!: string;

    @CreateDateColumn({ type: 'timestamp' })
    reg_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    mod_at!: Date;

}