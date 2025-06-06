import { Entity, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';

/**
 * 문제 세트 엔티티
 * @description 자격증 시험 문제들을 그룹화하여 관리하는 엔티티입니다.
 * @entity
 * @table question_sets
 */
@Entity({ tableName: 'question_sets' })
export class QuestionSetsEntity extends SoftDeletableEntity {
  /**
   * 문제 세트 이름
   * @description 문제 세트의 명칭을 저장합니다.
   * @type {string}
   * @example "SQLD"
   */
  @Property({ type: 'varchar', fieldName: 'question_set_name' })
  questionSetName!: string;

  /**
   * 문제 세트 설명/메모
   * @description 문제 세트에 대한 상세 설명이나 특이사항을 기록합니다.
   * @type {string | null}
   * @nullable
   * @example "2024년 개정"
   */
  @Property({ type: 'varchar', fieldName: 'question_set_memo', nullable: true })
  questionSetMemo?: string;

  /**
   * 문제 제공자/출처
   * @description 문제를 제공한 기관이나 출처를 기록합니다.
   * @type {string}
   * @example "한국데이터산업진흥원"
   */
  @Property({ type: 'varchar' })
  provider!: string;
}
