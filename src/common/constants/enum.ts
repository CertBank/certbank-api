/**
 * 'Y', 'N' 선택을 위한 열거형
 * @description 예 / 아니오 선택을 위한 공통 열거형입니다.
 */
export enum YNEnum {
  YES = 'Y',
  NO = 'N',
}

/**
 * 반응 타입 열거형
 * @description 토의에 대한 사용자 반응 타입을 정의합니다.
 */
export enum ReactionTypeEnum {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

/**
 * 신고 사유 열거형
 * @description 토의 신고 시 사용되는 사유 카테고리입니다.
 */
export enum ReportReasonEnum {
  /** 스팸 또는 광고성 콘텐츠 */
  SPAM = 'SPAM',
  /** 욕설, 비방, 모욕적 언어 */
  ABUSIVE_LANGUAGE = 'ABUSIVE_LANGUAGE',
  /** 혐오 발언 (인종, 성별, 종교 등에 대한) */
  HATE_SPEECH = 'HATE_SPEECH',
  /** 음란물 또는 성적 콘텐츠 */
  SEXUAL_CONTENT = 'SEXUAL_CONTENT',
  /** 허위 정보 또는 가짜 뉴스 */
  MISINFORMATION = 'MISINFORMATION',
  /** 개인정보 노출 */
  PRIVACY_VIOLATION = 'PRIVACY_VIOLATION',
  /** 저작권 침해 */
  COPYRIGHT_INFRINGEMENT = 'COPYRIGHT_INFRINGEMENT',
  /** 도배 또는 반복적 게시 */
  FLOODING = 'FLOODING',
  /** 주제와 무관한 내용 */
  OFF_TOPIC = 'OFF_TOPIC',
  /** 불법적인 활동 조장 */
  ILLEGAL_ACTIVITY = 'ILLEGAL_ACTIVITY',
  /** 기타 사유 */
  OTHER = 'OTHER',
}
