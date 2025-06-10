import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { QuestionOptionsEntity } from '../../../entities/questions/question-options.entity';
import { QuestionSetsEntity } from '../../../entities/questions/question-sets.entity';
import { QuestionSectionsEntity } from '../../../entities/questions/question-sections.entity';
import { QuestionsEntity } from '../../../entities/questions/questions.entity';

// 🎯 QuestionOptionsEntity에서 자동으로 DTO 생성
type QuestionOptionEntityFields = EntityToSeed<QuestionOptionsEntity>;
interface QuestionOptionSeedDto extends ReadonlySeed<QuestionOptionEntityFields> {}

export class QuestionOptionsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('🌱 QuestionOptions 시딩 시작...');

    // 기존 데이터 삭제
    const deleteCount = await em.nativeDelete(QuestionOptionsEntity, {});
    console.log(`🗑️ ${deleteCount}개 QuestionOptions 삭제 완료`);

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

    // 🔥 Question을 번호로 미리 조회
    const no = 1;

    const no_1 = await em.findOne(QuestionsEntity, {
      questionSet: sqld,
      questionSection: sqld_1,
      no,
    });

    if (!no_1) {
      throw new Error(`번호 ${no}의 Question을 찾을 수 없습니다. QuestionsSeeder를 먼저 실행해주세요.`);
    }

    // 새 데이터 삽입
    const questionOptions: QuestionOptionSeedDto[] = [
      {
        question: no_1,
        optionTitle: '1',
        optionContent: '<p>현실 세계를 일정한 형식에 맞추어 표현하는 추상화의 의미를 가질 수 있다.</p>',
      },
      {
        question: no_1,
        optionTitle: '2',
        optionContent:
          '<p>시스템 구현만을 위해 진행하는 사전단계의 작업으로서 데이터베이스 구축을 위한 사전작업의 의미가 있다.</p>',
      },
      {
        question: no_1,
        optionTitle: '3',
        optionContent: '<p>복잡한 현실을 제한된 언어나 표기법으로 이해하기 쉽게 하는 단순화의 의미를 가지고 있다.</p>',
      },
      {
        question: no_1,
        optionTitle: '4',
        optionContent:
          '<p>모호함을 배제하고 누구나 이해가 가능하도록 정확하게 현상을 기술하는 정확화의 의미를 가진다.</p>',
      },
    ];

    // 엔티티 생성 및 저장
    questionOptions.forEach((questionOption) => {
      em.create(QuestionOptionsEntity, questionOption);
    });

    await em.flush();

    console.log(`✅ ${questionOptions.length}개의 QuestionOptions 삽입 완료`);
  }
}
