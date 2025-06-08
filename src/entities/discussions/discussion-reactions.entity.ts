import { Cascade, Check, Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { UsersEntity } from '../users/users.entity';
import { DiscussionsEntity } from './discussions.entity';
import { ReactionTypeEnum } from '../../common/constants/enum';
import { DiscussionCommentsEntity } from './discussion-comments.entity';

/**
 * 토의 반응 엔티티
 * @description 사용자의 토의에 대한 반응(좋아요/싫어요)을 관리하는 엔티티입니다.
 * 한 사용자는 하나의 토의에 대해 하나의 반응만 가질 수 있습니다.
 * @entity
 * @table discussion_reactions
 */
@Entity({ tableName: 'discussion_reactions' })
@Check({
  expression: `(discussion_id IS NOT NULL AND discussion_comment_id IS NULL) OR (discussion_id IS NULL AND discussion_comment_id IS NOT NULL)`,
  name: 'discussion_reactions_parent_check',
})
@Index({ properties: ['discussion', 'reactionType'] })
@Index({ properties: ['discussionComment', 'reactionType'] })
export class DiscussionReactionsEntity extends BaseEntity {
  /**
   * 토의 참조 (선택적)
   * @description 반응이 달린 토의를 참조합니다.
   * @type {DiscussionsEntity}
   * @nullable true
   */
  @ManyToOne(() => DiscussionsEntity, { nullable: true, cascade: [Cascade.REMOVE] })
  discussion?: DiscussionsEntity;

  /**
   * 댓글 참조 (선택적)
   * @description 반응이 달린 댓글을 참조합니다.
   * @type {DiscussionCommentEntity}
   * @nullable true
   */
  @ManyToOne(() => DiscussionCommentsEntity, { nullable: true, cascade: [Cascade.REMOVE] })
  discussionComment?: DiscussionCommentsEntity;

  /**
   * 사용자 참조
   * @description 반응을 남긴 사용자를 참조합니다.
   * @type {UsersEntity}
   */
  @ManyToOne(() => UsersEntity, { nullable: true })
  user?: UsersEntity;

  /**
   * 반응 타입
   * @description 좋아요 또는 싫어요 타입입니다.
   * @type {ReactionTypeEnum}
   */
  @Enum(() => ReactionTypeEnum)
  @Property({ type: 'enum', fieldName: 'reaction_type' })
  reactionType!: ReactionTypeEnum;
}
