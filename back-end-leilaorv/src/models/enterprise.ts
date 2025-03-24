import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn  } from 'typeorm';
import { User } from './user';

@Entity('enterprise')
export class Enterprise {
  
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 100 })
    address!: string;

    @Column({type: 'varchar', length:10})
    cep!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    cnpj!: string;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })  // Altere o nome da coluna para "user_id"
    user!: User;
}