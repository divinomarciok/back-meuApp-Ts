import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Enterprise } from './enterprise';
import { Product } from './product';
import { User } from './user';

@Entity('price_list')
export class PriceList {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
    
    @ManyToOne(() => Enterprise, (enterprise) => enterprise.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'enterprise_id' }) 
    enterprise!: Enterprise;

    @Column({type: 'boolean'})
    isSale!: boolean;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price!: number;

    @Column({ type: 'date' })
    date_start!: Date;
    
    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user!: User;

}
