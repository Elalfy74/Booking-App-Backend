// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      isAdmin?: boolean;
      findFilter?: FindFilter;
      startIndex?: number;
      limit?: number;
      sort?: {
        [key]: "ASC" | "DESC";
      };
    }
  }
}
