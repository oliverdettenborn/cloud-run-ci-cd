import 'express-async-errors';

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';

import { responseErrorFormatter } from './utils/response-error-formatter';
import { loadEnv } from '@/config';

loadEnv();
export class App {
  readonly app = express();

  async init(): Promise<Express> {
    this.globalMiddlewaresSetup();
    await this.routersSetup();
    return this.app;
  }

  async close(): Promise<void> {
    return;
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }

  private globalMiddlewaresSetup(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private async routersSetup(): Promise<void> {
    this.app.use('/health', (_req, res) => {
      res.sendStatus(httpStatus.OK);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = httpStatus.INTERNAL_SERVER_ERROR;
      const shouldLog = true;

      if (shouldLog) console.error('Request/Response Error', error);
      res.status(status).json(responseErrorFormatter.format(error));
    });
  }
}

export const app = new App();
