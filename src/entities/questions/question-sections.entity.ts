import { Cascade, Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { QuestionSetsEntity } from './question-sets.entity';

/**
 * 문제 섹션 엔티티
 * @description 문제 세트 내의 챕터나 단락을 관리하는 엔티티입니다.
 * @entity
 * @table question_sections
 */
@Entity({ tableName: 'question_sections' })
@Index({ properties: ['questionSet', 'sectionOrder'] })
export class QuestionSectionsEntity extends SoftDeletableEntity {
  /**
   * 문제 세트 참조
   * @description 이 섹션이 속한 문제 세트를 참조합니다.
   * @type {QuestionSetsEntity}
   */
  @ManyToOne(() => QuestionSetsEntity, {
    cascade: [Cascade.REMOVE],
  })
  questionSet!: QuestionSetsEntity;

  /**
   * 섹션 명칭
   * @description 섹션의 제목이나 챕터명입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', fieldName: 'section_title' })
  sectionTitle!: string;

  /**
   * 섹션 설명
   * @description 섹션에 대한 상세 설명입니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'text', fieldName: 'section_description', nullable: true })
  sectionDescription?: string;

  /**
   * 섹션 순서
   * @description 문제 세트 내에서 섹션의 표시 순서입니다.
   * @type {number}
   * @default 1
   */
  @Property({ type: 'smallint', fieldName: 'section_order', default: 1 })
  sectionOrder: number = 1;
}
