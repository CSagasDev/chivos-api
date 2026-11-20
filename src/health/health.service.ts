import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async revisarBase(): Promise<{ base: string }> {
    try {
      await this.dataSource.query('SELECT 1');
      return { base: 'Ok' };
    } catch {
      throw new ServiceUnavailableException({ base: 'Sin conexión' });
    }
  }
}
