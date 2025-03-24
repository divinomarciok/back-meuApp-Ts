import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  
    @PrimaryGeneratedColumn()
    id!: number;
   
    @Column({ type: 'varchar', length: 255 })
    nome!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    login!: string;
   
    @Column({ type: 'varchar', length: 255 })
    senha!: string;
}
