import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProvidersEntity } from '../../../entities/providers/providers.entity';

export class ProvidersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('🌱 providers 시딩 시작...');

    // 기존 데이터 삭제
    const deleteCount = await em.nativeDelete(ProvidersEntity, {});

    console.log(`🗑️ ${deleteCount}개의 기존 Provider 삭제 완료`);

    // 새 데이터 삽입
    const providers: any[] = [
      {
        providerName: '한국데이터산업진흥원',
        providerDescription:
          '데이터 관련 자격증 및 교육을 담당하는 국가기관으로, 데이터분석 전문가 자격증 등을 관리합니다.',
        providerWebsite: 'https://www.kdata.or.kr',
      },
    ];

    // 엔티티 생성 및 저장
    providers.forEach((provider) => {
      em.create(ProvidersEntity, provider);
    });

    await em.flush();

    console.log(`✅ ${providers.length}개의 Provider 삽입 완료`);
  }
}
