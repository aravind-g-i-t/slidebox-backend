export type VerifiedToken<T> = T & {
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
};

export interface ITokenService {
  generateAccessToken(payload: object): Promise<string>;
  generateRefreshToken(payload:object):Promise<string>;
  verifyAccessToken<T extends object>(token: string): Promise<VerifiedToken<T>>;
  verifyRefreshToken<T extends object>(token: string): Promise<VerifiedToken<T>>;
}

