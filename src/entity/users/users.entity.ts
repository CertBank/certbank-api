import { Entity, Property } from '@mikro-orm/core';
import { SoftDeletableEntity } from '../base.entity';

/**
 * 사용자 엔티티
 * @description 시스템의 사용자 정보를 관리하는 메인 엔티티입니다.
 * 기본 개인정보 등을 포함합니다.
 * @entity
 * @table users
 */
@Entity({ tableName: 'users' })
export class UsersEntity extends SoftDeletableEntity {
  /**
   * 이메일 주소
   * @description 사용자의 기본 로그인 식별자이자 연락처입니다.
   * @type {string}
   * @unique true
   */
  @Property({ type: 'varchar', length: 100, fieldName: 'user_email', unique: true })
  userEmail!: string;

  /**
   * 표시 이름 (닉네임)
   * @description 커뮤니티에서 표시될 사용자명입니다.
   * @type {string}
   * @unique true
   */
  @Property({ type: 'varchar', length: 30, fieldName: 'user_name', unique: true })
  userName?: string;

  /**
   * 비밀번호 해시
   * @description 암호화된 사용자 비밀번호입니다. 소셜 로그인 사용자는 null일 수 있습니다.
   * @type {string | null}
   * @nullable true
   * @warning 평문으로 저장하지 마세요.
   */
  @Property({ type: 'varchar', length: 255, fieldName: 'password_hash', nullable: true })
  passwordHash?: string;

  /**
   * 프로필 이미지 URL
   * @description 사용자의 프로필 이미지 경로 또는 URL입니다.
   * @type {string | null}
   * @nullable true
   */
  @Property({ type: 'varchar', length: 500, fieldName: 'user_image_url', nullable: true })
  userImageUrl?: string;
}
