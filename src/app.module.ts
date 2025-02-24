import { Module } from '@nestjs/common';
import { FingerprintModule } from './fingerprint/fingerprint.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [FingerprintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
