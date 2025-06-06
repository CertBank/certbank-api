import { Check, Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { DiscussionsEntity } from './discussions.entity';
import { UsersEntity } from '../users/users.entity';
import { ReportReasonEnum } from '../../common/constant/enum';
import { DiscussionCommentsEntity } from './discussion-comments.entity';

/**
 * 토의 신고 엔티티
 * @description 사용자의 토의에 대한 신고를 관리하는 엔티티입니다.
 * 한 사용자는 하나의 토의에 대해 여러 번 신고할 수 있습니다.
 * @entity
 * @table discussion_reports
 */
@Entity({ tableName: 'discussion_reports' })
@Check({
  expression: `(discussion_id IS NOT NULL AND discussion_comment_id IS NULL) OR (discussion_id IS NULL AND discussion_comment_id IS NOT NULL)`,
  name: 'discussion_reports_parent_check',
})
@Index({ properties: ['discussion', 'reportReason'] })
@Index({ properties: ['discussionComment', 'reportReason'] })
export class DiscussionReportsEntity extends BaseEntity {
  /**
   * 토의 참조 (선택적)
   * @description 신고된 토의를 참조합니다.
   * @type {DiscussionsEntity}
   * @nullable true
   */
  @ManyToOne(() => DiscussionsEntity, { nullable: true })
  discussion?: DiscussionsEntity;

  /**
   * 댓글 참조 (선택적)
   * @description 신고된 댓글을 참조합니다.
   * @type {DiscussionCommentEntity}
   * @nullable true
   */
  @ManyToOne(() => DiscussionCommentsEntity, { nullable: true })
  discussionComment?: DiscussionCommentsEntity;

  /**
   * 사용자 참조
   * @description 신고를 한 사용자를 참조합니다.
   * @type {UsersEntity}
   */
  @ManyToOne(() => UsersEntity)
  user!: UsersEntity;

  /**
   * 신고 사유
   * @description 신고 사유의 타입입니다.
   * @type {ReportReasonEnum}
   */
  @Enum(() => ReportReasonEnum)
  @Property({ type: 'enum', fieldName: 'report_reason' })
  reportReason!: ReportReasonEnum;

  /**
   * 신고 내용
   * @description 신고에 대한 상세 설명입니다.
   * @type {string}
   * @nullable true
   */
  @Property({ type: 'text', fieldName: 'report_content', nullable: true })
  reportContent?: string;
}
