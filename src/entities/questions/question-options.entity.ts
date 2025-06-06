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
   * 선지 명칭
   * @description 선지의 명칭이 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', length: 10, fieldName: 'option_title' })
  optionTitle!: string;

  /**
   * 선지 내용
   * @description 선지의 내용이 담긴 텍스트입니다.
   * @type {string}
   */
  @Property({ type: 'text', fieldName: 'option_content' })
  optionContent!: string;
}
