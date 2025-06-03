import { ConfigModule, ConfigService } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export const MIKRO_ORM_CONFIG = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
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
