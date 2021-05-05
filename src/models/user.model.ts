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
import { Length, IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';

@Entity()
export default class User extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @IsEmail()
    @Column({ type: 'text' })
    email!: string;

    @Length(8,16)
    @Column({ type: 'text' })
    pwd!: string;
    
    @Length(14)
    @Column({ type: 'text' })
    username!: string;

    @CreateDateColumn({ type: 'timestamp' })
    reg_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    mod_at!: Date;

    @BeforeUpdate()
    @BeforeInsert()
    async saveEncryptedPassword(): Promise<void> {
        console.log("called saveEncryptedPassword")
        this.pwd = await bcrypt.hash(this.pwd, 5);
    }
}