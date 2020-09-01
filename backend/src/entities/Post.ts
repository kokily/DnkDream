import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Post;
