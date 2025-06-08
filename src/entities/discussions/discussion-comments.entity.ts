import { Cascade, Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';
import { UsersEntity } from '../users/users.entity';
import { DiscussionsEntity } from './discussions.entity';

/**
 * 토의 댓글 엔티티
 * @description 토의에 달리는 댓글을 관리하는 엔티티입니다.
 * 대댓글은 지원하지 않으며, 토의에 직접 달리는 댓글만 허용합니다.
 * @entity
 * @table discussion_comments
 */
@Entity({ tableName: 'discussion_comments' })
@Index({ properties: ['discussion', 'createdAt'] })
export class DiscussionCommentsEntity extends SoftDeletableEntity {
  /**
   * 토의 참조
   * @description 댓글이 달린 토의를 참조합니다.
   * @type {DiscussionsEntity}
   */
  @ManyToOne(() => DiscussionsEntity, { cascade: [Cascade.REMOVE] })
  discussion!: DiscussionsEntity;

  /**
   * 작성자 참조
   * @description 댓글을 작성한 사용자를 참조합니다.
   * @type {UsersEntity}
   * @nullable true
   */
  @ManyToOne(() => UsersEntity, { nullable: true })
  user?: UsersEntity;

  /**
   * 댓글 내용
   * @description 댓글의 텍스트 내용입니다.
   * @type {string}
   */
  @Property({ type: 'text', fieldName: 'comment_content' })
  commentContent!: string;
}
