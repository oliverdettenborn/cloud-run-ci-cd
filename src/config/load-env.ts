import path from 'path';
import * as dotenv from 'dotenv';

export function loadEnv(): void {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV must be defined');
  }

  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, `./../../.env.${process.env.NODE_ENV}`) });
  } else {
    dotenv.config();
  }
}
