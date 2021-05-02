import {
    BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ type: 'text' })
    uid!: string;

    @Column({ type: 'text' })
    pwd!: string;

    @Column({ type: 'text' })
    nick_name!: string;

    @Column({ type: 'timestamp' })
    reg_at!: Date;

    @Column({ type: 'timestamp' })
    mod_at!: Date;
}