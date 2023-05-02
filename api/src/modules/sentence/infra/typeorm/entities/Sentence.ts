import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import SentenceCategory from '@modules/sentenceCategory/infra/typeorm/entities/SentenceCategory';

@Entity('sentence')
class Sentence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sentence_category_id: string;

  @ManyToOne(() => SentenceCategory)
  @JoinColumn({ name: 'sentence_category_id' })
  sentenceCategory: SentenceCategory;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  coligate: string;

  @Column()
  system_code: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Sentence;
