import config from 'config';
import { serialize } from 'cookie';
import { sign, verify } from 'jsonwebtoken';

type Payload = {
  userId: string;
  isAdmin: boolean;
};

export const signAccessToken = ({ userId, isAdmin }: Payload) => {
  return sign({ userId: userId, isAdmin: isAdmin }, config.get('tokenKey'));
};

export const verifyAccessToken = (token: string) => {
  return verify(token, config.get('tokenKey')) as Payload;
};

export const signRefreshToken = ({ userId, isAdmin }: Payload) => {
  return sign({ userId: userId, isAdmin: isAdmin }, config.get('refreshTokenKey'));
};

export const signCookiesToken = (payload: Payload) => {
  const token = signAccessToken(payload);

  return serialize('JWT_TOKEN', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'strict',
    path: '/',
  });
};
