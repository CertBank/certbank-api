import 'dotenv/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModuleAsyncOptions, MikroOrmModuleOptions } from '@mikro-orm/nestjs';

/**
 * MikroORM CLI용 설정
 * @description CLI 명령어(마이그레이션, 스키마 생성 등)에서 사용되는 MikroORM 설정입니다.
 * defineConfig를 사용하여 PostgreSQL 드라이버가 자동으로 설정됩니다.
 * @example yarn mikro-orm schema:create --run --config dist/config/mikro-orm.config.js
 */
export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
});

/**
 * NestJS용 MikroORM 설정
 * @description NestJS 애플리케이션에서 사용되는 MikroORM 모듈 설정입니다.
 * ConfigService를 통해 환경변수를 주입받아 동적으로 설정을 구성합니다.
 * @type {MikroOrmModuleAsyncOptions}
 */
export const MIKRO_ORM_CONFIG: MikroOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MikroOrmModuleOptions> => ({
    driver: PostgreSqlDriver,
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    user: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    dbName: configService.get<string>('DATABASE_NAME'),
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    migrations: {
      path: 'dist/database/migrations',
      pathTs: 'database/migrations',
      tableName: 'mikro_orm_migrations',
      transactional: true,
    },
    seeder: { path: 'dist/database/seeders', pathTs: 'database/seeders' },
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    allowGlobalContext: true,
    autoLoadEntities: true,
  }),
};
