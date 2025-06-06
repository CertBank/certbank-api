import { Entity, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';

/**
 * 자격 시험 제공자 엔티티
 * @description 자격 시험을 제공하는 기관이나 출처를 관리하는 엔티티입니다.
 * @entity
 * @table providers
 */
@Entity({ tableName: 'providers' })
export class ProvidersEntity extends SoftDeletableEntity {
  /**
   * 제공자명
   * @description 문제를 제공하는 기관이나 출처의 이름입니다.
   * @type {string}
   */
  @Property({ type: 'varchar', fieldName: 'provider_name' })
  providerName!: string;

  /**
   * 제공자 설명
   * @description 제공자에 대한 상세 설명입니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'text', fieldName: 'provider_description', nullable: true })
  providerDescription?: string;

  /**
   * 제공자 웹사이트
   * @description 제공자의 공식 웹사이트 URL입니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'varchar', fieldName: 'provider_website', nullable: true })
  providerWebsite?: string;
}
