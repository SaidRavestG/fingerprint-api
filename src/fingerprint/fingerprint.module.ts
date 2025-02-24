import { Module } from '@nestjs/common';
import { FingerprintController } from './fingerprint.controller';
import { FingerprintService } from './fingerprint.service';
import { SecugenService } from './services/secugen.service';

@Module({
  imports: [],
  controllers: [FingerprintController],
  providers: [FingerprintService, SecugenService],
})
export class FingerprintModule {} 