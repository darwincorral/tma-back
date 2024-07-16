import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import { Provider } from 'src/modules/providers/entities/provider.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: string;
  @Column({ default: 0 })
  quantity: number;
  @Column()
  unitMeasure: string;
  @Column({ default: 'ACT' })
  status: string;
  @Column()
  discount: string;
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
  @OneToMany(
    () => DeliveryDetails,
    (deliveryDetails) => deliveryDetails.product,
  )
  deliveryDetails: DeliveryDetails[];
  @ManyToOne(() => Provider, (provider) => provider.id, { eager: true })
  provider: number;
}
