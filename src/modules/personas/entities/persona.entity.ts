import { DeliveryDetails } from 'src/modules/detalles-entregas/entities/detalles-entregas.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  mail: string;
  @Column()
  identification: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  password: string;
  @Column()
  role: string;
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
  @OneToMany(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.people)
  deliveryDetails: DeliveryDetails[];
}
