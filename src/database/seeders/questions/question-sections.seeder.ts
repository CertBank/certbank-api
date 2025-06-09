import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionSectionsEntity } from '../../../entities/questions/question-sections.entity';
import { QuestionSetsEntity } from '../../../entities/questions/question-sets.entity';

export class QuestionSectionsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('🌱 QuestionSections 시딩 시작...');

    // 기존 데이터 삭제
    const deleteCount = await em.nativeDelete(QuestionSectionsEntity, {});
    console.log(`🗑️ ${deleteCount}개 QuestionSection 삭제 완료`);

    // 🔥 QuestionSet를 이름으로 미리 조회
    const sqld = await em.findOne(QuestionSetsEntity, {
      setTitle: 'SQLD',
    });

    // 새 데이터 삽입
    const questionSections: any[] = [
      {
        sectionTitle: '데이터 모델링의 이해',
        sectionOrder: 1,
        questionSet: sqld,
      },
      {
        sectionTitle: 'SQL 기본 및 활용',
        sectionOrder: 2,
        questionSet: sqld,
      },
    ];

    // 엔티티 생성 및 저장
    questionSections.forEach((questionSection) => {
      em.create(QuestionSectionsEntity, questionSection);
    });

    await em.flush();

    console.log(`✅ ${questionSections.length}개의 QuestionSection 삽입 완료`);
  }
}
