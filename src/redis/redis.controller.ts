import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('read')
  async getData(@Query('key') key: string): Promise<any> {
    return await this.redisService.getData(key);
  }

  @Post('write')
  async createData(
    @Body('key') key: string,
    @Body('value') value: string,
  ): Promise<any> {
    return await this.redisService.createData(key, value);
  }
}
