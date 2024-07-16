import { Vehicle } from 'src/modules/transportes/entities/transporte.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  identification: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  mail: string;
  @Column()
  password: string;
  @Column({ default: '0' })
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
  @OneToMany(() => Vehicle, (vehicle) => vehicle.drivers)
  vehicle: Vehicle[];
}
