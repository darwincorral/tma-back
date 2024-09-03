import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  hour: string;
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
  @ManyToOne(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.id, { eager: true })
  deliveryDetails: number;
}
