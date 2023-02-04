import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE_URI: string;
      PORT: number;
      ACCESS_TOKEN_SECRET: Secret;
      REFRESH_TOKEN_SECRET: Secret;
    }
  }
}

export {};
