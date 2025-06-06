import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { QuestionsEntity } from './questions.entity';

/**
 * 선지 엔티티
 * @description 문항의 선지 정보를 관리하는 엔티티입니다.
 * 문항(questions)에 속하는 선지를 나타냅니다.
 * @entity
 * @table question_options
 */
@Entity({ tableName: 'question_options' })
export class QuestionOptionsEntity extends BaseEntity {
  /**
   * 문항 참조
   * @description 이 선지가 속한 문항을 참조합니다.
   * @type {QuestionsEntity}
   */
  @ManyToOne(() => QuestionsEntity)
  question!: QuestionsEntity;

  /**
   * 선지 번호
   * @description 선지의 번호가 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', length: 10, fieldName: 'question_option_no' })
  questionOptionNo!: string;

  /**
   * 선지 내용
   * @description 선지의 내용이 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'text', fieldName: 'question_option_text' })
  questionOptionText!: string;
}
