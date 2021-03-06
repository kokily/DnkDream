import { ConnectionOptions } from 'typeorm';
import entities from './entities';

const ConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  synchronize: true,
  logging: true,
  entities,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default ConnectionOptions;
