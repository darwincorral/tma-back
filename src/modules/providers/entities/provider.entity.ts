import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column()
  latitude: string;
  @Column()
  length: string;
  @Column()
  type: string;
  @Column({ default: 'ACT' })
  status: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateChange: string;
  @Column()
  userCreated: string;
  @Column({ default: null })
  userChange: string;
  @DeleteDateColumn()
  deletedAt: Date;
  @OneToMany(() => Product, (product) => product.provider)
  product: Product[];
}
