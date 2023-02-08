import * as jwt from '../jwt-helper';

describe('JWT', () => {
  const payload = { userId: '1', isAdmin: false };

  describe('Sign and Verify Access Token', () => {
    it('Should return a valid access token', () => {
      const token = jwt.signAccessToken(payload);

      const decodedToken = jwt.verifyAccessToken(token);

      expect(decodedToken).toMatchObject(payload);
    });
  });
});
