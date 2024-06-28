import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private readonly EXPIRY_TIME_60_SECOND = 60;

  constructor(@Inject('RedisClient') private client: RedisClientType) {}

  getSimple(key: string) {
    return this.client.get(key);
  }

  getHashSet(key: string) {
    return this.client.hGetAll(key);
  }

  getHashKey(set: string, key: string) {
    return this.client.hGet(set, key);
  }

  async setSimple(key: string, value: string) {
    const result = this.client.set(key, value);
    await this.setExpiry(key);
    return result;
  }

  async setHashSet(key: string, value: Record<string, string | number>) {
    const result = await this.client.hSet(key, value);
    await this.setExpiry(key);
    return result;
  }

  async setExpiry(key: string, expiry: number = this.EXPIRY_TIME_60_SECOND) {
    await this.client.expire(key, expiry);
  }
}
