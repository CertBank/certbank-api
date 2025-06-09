import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProvidersSeeder } from './providers/providers.seeder';
import { QuestionSetsSeeder } from './questions/question-sets.seeder';
import { QuestionSectionsSeeder } from './questions/question-sections.seeder';
import { QuestionsSeeder } from './questions/questions.seeder';
import { QuestionOptionsSeeder } from './questions/question-options.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // 시딩 순서대로 실행
    await this.call(em, [
      ProvidersSeeder,
      QuestionSetsSeeder,
      QuestionSectionsSeeder,
      QuestionsSeeder,
      QuestionOptionsSeeder,
    ]);
  }
}
