import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'boolean' })
  admin!: boolean;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt!: Date;

  public validPassword = async (password: string): Promise<boolean> => {
    return await bcrypt.compare(password, this.password);
  };

  public generateToken = (): string => {
    const token = jwt.sign(
      {
        id: this.id,
        username: this.username,
        admin: this.admin,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '7d',
      }
    );

    return token;
  };

  private hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  public setPassword = async (password: string): Promise<void> => {
    this.password = await this.hashPassword(password);
  };
}

export default User;
