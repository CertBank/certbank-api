import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { ProvidersEntity } from '../providers/providers.entity';

/**
 * 문제 세트 엔티티
 * @description 자격증 시험 문제들을 그룹화하여 관리하는 엔티티입니다.
 * @entity
 * @table question_sets
 */
@Entity({ tableName: 'question_sets' })
export class QuestionSetsEntity extends SoftDeletableEntity {
  /**
   * 문제 제공자 참조
   * @description 이 문제 세트를 제공한 기관이나 출처를 참조합니다.
   * @type {ProvidersEntity}
   */
  @ManyToOne(() => ProvidersEntity)
  provider!: ProvidersEntity;

  /**
   * 문제 세트 명칭
   * @description 문제 세트의 명칭을 저장합니다.
   * @type {string}
   */
  @Property({ type: 'varchar', fieldName: 'set_title' })
  setTitle!: string;

  /**
   * 문제 세트 설명
   * @description 문제 세트에 대한 상세 설명이나 특이사항을 기록합니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'varchar', fieldName: 'set_description', nullable: true })
  setDescription?: string;
}
