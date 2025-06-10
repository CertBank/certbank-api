import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionsEntity } from '../../../entities/questions/questions.entity';
import { QuestionSectionsEntity } from '../../../entities/questions/question-sections.entity';
import { QuestionSetsEntity } from '../../../entities/questions/question-sets.entity';
import { YNEnum } from '../../../common/constants/enum';

// 🎯 QuestionsEntity에서 자동으로 DTO 생성
type QuestionEntityFields = EntityToSeed<QuestionsEntity>;
interface QuestionSeedDto extends ReadonlySeed<QuestionEntityFields> {}

export class QuestionsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('🌱 Questions 시딩 시작...');

    // 기존 데이터 삭제
    const deleteCount = await em.nativeDelete(QuestionsEntity, {});
    console.log(`🗑️ ${deleteCount}개 Question 삭제 완료`);

    // 🔥 QuestionSet을 이름으로 미리 조회
    const setTitle = 'SQLD';

    const sqld = await em.findOne(QuestionSetsEntity, {
      setTitle,
    });

    if (!sqld) {
      throw new Error(`${setTitle} QuestionSet을 찾을 수 없습니다. QuestionSetsSeeder를 먼저 실행해주세요.`);
    }

    // 🔥 QuestionSection을 이름으로 미리 조회
    const sectionTitle = '데이터 모델링의 이해';

    const sqld_1 = await em.findOne(QuestionSectionsEntity, {
      sectionTitle,
    });

    if (!sqld_1) {
      throw new Error(
        `${sectionTitle} QuestionSection을 찾을 수 없습니다. QuestionSectionsSeeder를 먼저 실행해주세요.`,
      );
    }

    // 새 데이터 삽입
    const questions: QuestionSeedDto[] = [
      {
        questionSet: sqld,
        questionSection: sqld_1,
        no: 1,
        content: '<p>데이터 모델링의 특징으로 가장 적절하지 <u>않은</u> 것은?</p>',
        subContentUseYn: YNEnum.NO,
        multipleOptionsUseYn: YNEnum.NO,
        multipleOptionCnt: 1,
      },
    ];

    // 엔티티 생성 및 저장
    questions.forEach((question) => {
      em.create(QuestionsEntity, question);
    });

    await em.flush();

    console.log(`✅ ${questions.length}개의 Question 삽입 완료`);
  }
}
