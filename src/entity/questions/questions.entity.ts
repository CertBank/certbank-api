import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { QuestionSetsEntity } from './question-sets.entity';
import { YNEnum } from '../../common/constant/enum';

/**
 * 문항 엔티티
 * @description 문항의 지문과 설정 정보를 관리하는 엔티티입니다.
 * 문제 세트(question_sets)에 속하는 각각의 문항을 나타냅니다.
 * @entity
 * @table questions
 */
@Entity({ tableName: 'questions' })
export class QuestionsEntity extends SoftDeletableEntity {
  /**
   * 문제 세트 참조
   * @description 이 문항이 속한 문제 세트를 참조합니다.
   * @type {QuestionSetsEntity}
   * @relation ManyToOne - 하나의 문제 세트에 여러 문항이 속할 수 있습니다.
   */
  @ManyToOne(() => QuestionSetsEntity)
  questionSet!: QuestionSetsEntity;

  /**
   * 문항 지문
   * @description 실제 문항의 지문 내용이 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', fieldName: 'question_text' })
  questionText!: string;

  /**
   * 추가 지문 사용 여부
   * @description 문항의 지문에 대한 추가 설명을 사용할지 여부를 결정합니다.
   * @type {YNEnum}
   * @default YNEnum.NO
   */
  @Enum(() => YNEnum)
  @Property({ fieldName: 'question_sub_text_use_yn', default: YNEnum.NO })
  questionSubTextUseYn: YNEnum = YNEnum.NO;

  /**
   * 문제 부제목
   * @description 지문에 대한 추가 설명입니다.
   * questionSubTextUseYn이 'Y'일 때만 사용됩니다.
   * @type {string | null}
   * @nullable
   */
  @Property({ type: 'varchar', fieldName: 'question_sub_text', nullable: true })
  questionSubText?: string;

  /**
   * 객관식 복수 선택 옵션 사용 여부
   * @description 복수 선택지 문항인지 여부를 결정합니다.
   * @type {YNEnum}
   * @default YNEnum.NO
   */
  @Enum(() => YNEnum)
  @Property({ fieldName: 'question_multiple_options_use_yn', default: YNEnum.NO })
  questionMultipleOptionsUseYn: YNEnum = YNEnum.NO;

  /**
   * 선지 최대 선택 개수
   * @description 문항에서 선택할 수 있는 선지의 최대 개수입니다.
   * @type {number}
   * @default 1
   */
  @Property({ type: 'integer', fieldName: 'question_multiple_max_cnt', default: 1 })
  questionMultipleMaxCnt: number = 1;
}
