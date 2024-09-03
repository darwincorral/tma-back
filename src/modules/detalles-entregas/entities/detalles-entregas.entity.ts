import { Delivery } from 'src/modules/deliveries/entities/delivery.entity';
import { People } from 'src/modules/personas/entities/persona.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Route } from 'src/modules/routes/entities/route.entity';
import { Vehicle } from 'src/modules/transportes/entities/transporte.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class DeliveryDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: string;
  @Column()
  cost: string;
  @Column()
  discount: number;
  @Column()
  rating: string;
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
  @ManyToOne(() => Vehicle, (drivers) => drivers.id, { eager: true })
  vehicle: number;
  @OneToMany(() => Route, (route) => route.deliveryDetails)
  route: Route[];
  @ManyToOne(() => Delivery, (delivery) => delivery.id, { eager: true })
  delivery: number;
  @ManyToOne(() => People, (people) => people.id, { eager: true })
  people: number;
  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: number;
}
