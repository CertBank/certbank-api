import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProvidersSeeder } from './providers/providers.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // 시딩 순서대로 실행
    return this.call(em, [ProvidersSeeder]);
  }
}
