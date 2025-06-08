import { Cascade, Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { QuestionsEntity } from '../questions/questions.entity';
import { UsersEntity } from '../users/users.entity';

/**
 * 토의 엔티티
 * @description 문항에 대한 토의 내용과 제안 답안을 관리하는 엔티티입니다.
 * 사용자들이 문제의 정답에 대해 토론하고 의견을 나눌 수 있습니다.
 * @entity
 * @table discussions
 */
@Entity({ tableName: 'discussions' })
@Index({ properties: ['question', 'createdAt'] })
export class DiscussionsEntity extends SoftDeletableEntity {
  /**
   * 문항 참조
   * @description 이 토의가 속한 문항을 참조합니다.
   * @type {QuestionsEntity}
   */
  @ManyToOne(() => QuestionsEntity, { cascade: [Cascade.REMOVE] })
  question!: QuestionsEntity;

  /**
   * 작성자 참조
   * @description 이 토의를 작성한 사용자를 참조합니다.
   * @type {User}
   * @nullable true
   */
  @ManyToOne(() => UsersEntity, { nullable: true })
  user?: UsersEntity;

  /**
   * 토의 내용
   * @description 토의의 상세 내용입니다.
   * @type {string}
   */
  @Property({ type: 'text', fieldName: 'content' })
  content!: string;

  /**
   * 정답 제안
   * @description 작성자가 제안하는 정답입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', fieldName: 'suggested_answer' })
  suggestedAnswer!: string;
}
