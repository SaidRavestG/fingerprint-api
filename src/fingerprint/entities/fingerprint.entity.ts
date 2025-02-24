import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('fingerprints')
export class Fingerprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  userId: string;

  @Column({ type: 'blob' })
  templateData: Buffer;

  @CreateDateColumn()
  createdAt: Date;
} 