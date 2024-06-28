import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('simple')
  readSimple(@Query('key') key: string): Promise<any> {
    return this.redisService.getSimple(key);
  }

  @Get('hash-set')
  getHashSet(@Query('key') key: string): Promise<any> {
    return this.redisService.getHashSet(key);
  }

  @Get('hash-key')
  getHashKey(
    @Query('set') set: string,
    @Query('key') key: string,
  ): Promise<any> {
    return this.redisService.getHashKey(set, key);
  }

  @Post('simple')
  setSimple(
    @Body('key') key: string,
    @Body('value') value: string,
  ): Promise<any> {
    return this.redisService.setSimple(key, value);
  }

  @Post('hash')
  setHash(
    @Body('key') key: string,
    @Body('value') value: Record<string, string | number>,
  ): Promise<any> {
    return this.redisService.setHashSet(key, value);
  }
}
