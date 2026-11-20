import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get()
  check(): { status: string } {
    return { status: 'Ok' };
  }
  @Get('base')
  revisarBase(): Promise<{ base: string }> {
    return this.healthService.revisarBase();
  }
}
