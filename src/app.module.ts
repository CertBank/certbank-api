import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MIKRO_ORM_CONFIG } from './config/mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MikroOrmModule.forRootAsync(MIKRO_ORM_CONFIG)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
