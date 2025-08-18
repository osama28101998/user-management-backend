// import { JWTPayload } from '../interfaces/types';

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: JWTPayload;
//   }
// }
 
declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email?: string;
      role?: string;
    };
  }
}
