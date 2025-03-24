import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { User } from './user';
import { Category } from './category';


@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;
    mark!: string; 
   
    @Column({ type: 'varchar', length: 100, nullable: true })
    description?: string;     

    @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    unidade_measure?: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    weigth?: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })  // Altere o nome da coluna para "user_id"
    user!: User;
    
}
