import { Injectable } from '@nestjs/common';
import { SecugenService } from './services/secugen.service';

@Injectable()
export class FingerprintService {
  constructor(private secugenService: SecugenService) {}

  async captureFingerprint(userId: string) {
    const templateData = await this.secugenService.captureFingerprint();
    return { userId, templateData };
  }
} 