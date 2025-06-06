import { Check, Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { QuestionSetsEntity } from './question-sets.entity';
import { QuestionSectionsEntity } from './question-sections.entity';
import { YNEnum } from '../../common/constant/enum';

/**
 * 문항 엔티티
 * @description 문항의 지문과 설정 정보를 관리하는 엔티티입니다.
 * 문제 섹션 또는 문제 세트에 직접 속할 수 있습니다.
 * @entity
 * @table questions
 */
@Entity({ tableName: 'questions' })
@Check({
  expression: `(question_set_id IS NOT NULL AND question_section_id IS NULL) OR (question_set_id IS NULL AND question_section_id IS NOT NULL)`,
  name: 'chk_questions_parent',
})
@Index({ properties: ['questionSet'] })
@Index({ properties: ['questionSection'] })
export class QuestionsEntity extends SoftDeletableEntity {
  /**
   * 문제 세트 참조 (선택적)
   * @description 이 문항이 직접 속한 문제 세트를 참조합니다.
   * 섹션이 없는 경우에만 사용됩니다.
   * @type {QuestionSetsEntity}
   * @nullable true
   */
  @ManyToOne(() => QuestionSetsEntity, { nullable: true })
  questionSet?: QuestionSetsEntity;

  /**
   * 문제 섹션 참조 (선택적)
   * @description 이 문항이 속한 문제 섹션을 참조합니다.
   * @type {QuestionSectionsEntity}
   * @nullable true
   */
  @ManyToOne(() => QuestionSectionsEntity, { nullable: true })
  questionSection?: QuestionSectionsEntity;

  /**
   * 문항 지문
   * @description 문항의 지문 내용이 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'text', fieldName: 'question_text' })
  questionText!: string;

  /**
   * 추가 지문 사용 여부
   * @description 문항의 지문에 대한 추가 설명을 사용할지 여부를 결정합니다.
   * @type {YNEnum}
   * @default YNEnum.NO
   */
  @Enum(() => YNEnum)
  @Property({ type: 'enum', fieldName: 'question_sub_text_use_yn', default: YNEnum.NO })
  questionSubTextUseYn: YNEnum = YNEnum.NO;

  /**
   * 문제 부제목
   * @description 지문에 대한 추가 설명입니다.
   * questionSubTextUseYn이 'Y'일 때만 사용됩니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'text', fieldName: 'question_sub_text', nullable: true })
  questionSubText?: string;

  /**
   * 객관식 복수 선택 옵션 사용 여부
   * @description 복수 선택지 문항인지 여부를 결정합니다.
   * @type {YNEnum}
   * @default YNEnum.NO
   */
  @Enum(() => YNEnum)
  @Property({ type: 'enum', fieldName: 'question_multiple_options_use_yn', default: YNEnum.NO })
  questionMultipleOptionsUseYn: YNEnum = YNEnum.NO;

  /**
   * 선지 최대 선택 개수
   * @description 문항에서 선택할 수 있는 선지의 최대 개수입니다.
   * @type {number}
   * @default 1
   */
  @Property({ type: 'tinyint', fieldName: 'question_multiple_option_cnt', default: 1 })
  questionMultipleOptionCnt: number = 1;
}
