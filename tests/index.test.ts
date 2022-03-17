import request, { SuperTest, Test } from 'supertest';
import httpStatus from 'http-status';
import { app } from '@/app';

let server: SuperTest<Test> = null;
beforeAll(async () => {
  const initializedApp = await app.init();
  server = request(initializedApp);
});

afterAll(async () => {
  await app.close();
});

describe('Server tests', () => {
  describe('GET /health', () => {
    it('should respond with status 200', async () => {
      const res = await server.get('/health').send();

      expect(res.status).toBe(httpStatus.OK);
    });
  });
});
