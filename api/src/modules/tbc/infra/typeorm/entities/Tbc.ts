import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Client from '@modules/client/infra/typeorm/entities/Client';

@Entity('tbc')
class Tbc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  name: string;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column()
  link: string;

  @Column()
  unlicensed_method: boolean;

  @Column()
  context_coligate_code: string;

  @Column()
  context_branch_code: string;

  @Column()
  context_education_level_code: string;

  @Column()
  context_system_code: string;

  @Column()
  context_user_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Tbc;
