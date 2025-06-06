/**
 * Seeder 관련 상수
 * @description 데이터 시딩을 위한 상수입니다.
 */
export const SEEDER_CONSTANTS = {
  /** 기본 배치 크기 */
  DEFAULT_BATCH_SIZE: 100,

  /** Seeder 실행 순서 */
  EXECUTION_ORDER: ['users', 'providers', 'question-sets', 'question-sections', 'questions'] as const,
} as const;
