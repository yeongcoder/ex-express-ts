import {
    BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";
import bcrypt from 'bcrypt';

import PostModel from './post.model';

@Entity()
export default class User extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ type: "text" })
    email!: string;

    @Column({ type: "text" })
    pwd!: string;
    
    @Column({ type: "text" })
    username!: string;

    @CreateDateColumn({ type: 'timestamp' })
    reg_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    mod_at!: Date;

    @OneToMany((type) => PostModel, (post) => post.user)
    posts!: PostModel[] | null

    @BeforeUpdate()
    @BeforeInsert()
    async saveEncryptedPassword(): Promise<void> {
        this.pwd = await bcrypt.hash(this.pwd, 5);
    }
}