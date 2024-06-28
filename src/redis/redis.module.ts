import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient, RedisClientType } from 'redis';
import { RedisController } from './redis.controller';

@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'RedisClient',
      useFactory: async (): Promise<RedisClientType> => {
        const client = createClient();
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        return client as RedisClientType;
      },
    },
  ],
})
export class RedisModule {}
