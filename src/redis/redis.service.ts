import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('RedisClient') private client: RedisClientType) {}

  getData(key: string) {
    return this.client.get(key);
  }

  createData(key: string, value: string) {
    return this.client.set(key, value);
  }
}
