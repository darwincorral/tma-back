import { Drivers } from 'src/modules/conductores/entities/conductor.entity';
import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate: string;
  @Column()
  brand: string;
  @Column()
  typeVehicle: string;
  @Column()
  capacity: number;
  @Column({ default: 0 })
  priority: number;
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
  @ManyToOne(() => Drivers, (drivers) => drivers.id, { eager: true })
  drivers: number;
  @OneToMany(
    () => DeliveryDetails,
    (deliveryDetails) => deliveryDetails.vehicle,
  )
  deliveryDetails: DeliveryDetails[];
}
