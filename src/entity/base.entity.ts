import { Filter, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * 모든 엔티티의 기본 클래스
 * @description 공통적으로 필요한 필드(ID, 생성시간, 수정시간)를 제공합니다. 직접 인스턴스화할 수 없으며, 상속받아서 사용해야 합니다.
 * @abstract
 */
export abstract class BaseEntity {
  /**
   * 기본 키 (자동 증가)
   * @description PostgreSQL의 SERIAL 타입을 사용하여 자동으로 1부터 순차 증가합니다.
   * @type {number}
   * @warning 자동으로 설정되므로 수동 변경 금지
   */
  @PrimaryKey({ type: 'serial' })
  id!: number;

  /**
   * 엔티티 생성 시간
   * @description 엔티티가 처음 데이터베이스에 저장될 때 자동으로 설정됩니다.
   * 이후 수정되지 않습니다.
   * @type {Date}
   * @warning 자동으로 설정되므로 수동 변경 금지
   */
  @Property({
    type: 'timestamptz',
    onCreate: () => new Date(),
  })
  createdAt!: Date;

  /**
   * 엔티티 최종 수정 시간
   * @description 엔티티가 생성될 때와 업데이트될 때마다 자동으로 현재 시간으로 갱신됩니다.
   * @type {Date}
   * @warning 자동으로 설정되므로 수동 변경 금지
   */
  @Property({
    type: 'timestamptz',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;
}

/**
 * Soft Delete 기능을 제공하는 엔티티 기본 클래스
 * @description 실제 데이터를 삭제하는 대신 deletedAt 필드를 설정하여 논리적 삭제를 구현합니다. 이를 통해 데이터 복구가 가능하고 관계 무결성을 유지할 수 있습니다.
 * @abstract
 * @extends BaseEntity
 * @see {@link https://mikro-orm.io/docs/filters | MikroORM Filters} Global Filter 설정 필요
 */
@Filter({
  name: 'softDelete',
  cond: { deletedAt: null },
  default: true,
})
export abstract class SoftDeletableEntity extends BaseEntity {
  /**
   * 논리적 삭제 시간
   * @description Date: 삭제된 시간 (논리적으로 삭제됨)
   * @type {Date | null}
   * @nullable
   * @warning 이 필드를 직접 조작하기보다는 별도의 유틸리티 메서드 사용 권장
   */
  @Property({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}
