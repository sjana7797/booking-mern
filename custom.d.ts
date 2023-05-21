// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module Express {
  export interface Request {
    user?: {
      email: string;
      _id: string;
      username: string;
      isAdmin: boolean;
    };
  }
}
