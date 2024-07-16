import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ type: 'datetime' })
  deliveryDate: string;
  @Column()
  shippingCost: string;
  @Column()
  tax: string;
  @Column()
  total: string;
  @Column()
  paymentMethod: string;
  @Column()
  observation: string;
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
  @Column()
  deletedAt: Date;
  @OneToMany(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.delivery)
  deliveryDetails: DeliveryDetails[];
}
