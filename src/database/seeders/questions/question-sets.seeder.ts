import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionSetsEntity } from '../../../entities/questions/question-sets.entity';
import { ProvidersEntity } from '../../../entities/providers/providers.entity';

export class QuestionSetsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('🌱 QuestionSets 시딩 시작...');

    // 기존 데이터 삭제
    const deleteCount = await em.nativeDelete(QuestionSetsEntity, {});
    console.log(`🗑️ ${deleteCount}개 QuestionSet 삭제 완료`);

    // 🔥 Provider를 이름으로 미리 조회
    const kdata = await em.findOne(ProvidersEntity, {
      providerName: '한국데이터산업진흥원',
    });

    // Provider가 없으면 오류 처리
    if (!kdata) {
      console.error('❌ 필요한 Provider를 찾을 수 없습니다. Providers를 먼저 시딩해주세요.');
    }

    // 새 데이터 삽입
    const questionSets: any[] = [
      {
        setTitle: 'SQLD',
        setDescription: '2024년 개정',
        provider: kdata,
      },
    ];

    // 엔티티 생성 및 저장
    questionSets.forEach((questionSet) => {
      em.create(QuestionSetsEntity, questionSet);
    });

    await em.flush();

    console.log(`✅ ${questionSets.length}개의 QuestionSet 삽입 완료`);
  }
}
