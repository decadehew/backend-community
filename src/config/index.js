const DB_URL = 'mongodb://test:123@192.168.0.101:27017/testdb';
const REDIS = {
  host: '192.168.0.102',
  port: 15001,
  password: '123',
};

const JWT_SECRET = 'udevhouse_testing'

export default {
  DB_URL,
  REDIS,
  JWT_SECRET
};
