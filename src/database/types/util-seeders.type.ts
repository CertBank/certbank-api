// 🔧 유틸리티 타입

/**
 * Entity에서 자동 생성 필드들 제거
 */
type EntityToSeed<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Readonly 타입으로 변환 (실수로 수정 방지)
 */
type ReadonlySeed<T> = Readonly<T>;
