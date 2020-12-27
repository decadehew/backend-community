import { getValue } from '@/config/RedisConfig';

const checkCode = async (key, value) => {
  const redisData = await getValue(key);

  if (redisData != null) {
    return redisData.toLowerCase() === value.toLowerCase();
  }

  return false;
}

export {
  checkCode
}
