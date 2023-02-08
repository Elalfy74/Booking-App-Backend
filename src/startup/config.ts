import config from 'config';

export default () => {
  if (!config.get('tokenKey')) {
    throw new Error('ERROR: tokenKey is not defined');
  }
  if (!config.get('db')) {
    throw new Error('ERROR: DB is not defined');
  }
};
