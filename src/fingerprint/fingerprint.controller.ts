import { Controller, Get, Post, Param } from '@nestjs/common';
import { SecugenService } from './services/secugen.service';


@Controller('fingerprint')
export class FingerprintController {
  constructor(private readonly secugenService: SecugenService) {}

  @Get('test-sdk')
  async testSDK() {
    try {
      const diagnostico = await this.secugenService.testSDKConnection();
      return {
        status: 'OK',
        detalles: {
          sdkInicializado: diagnostico.sdkInicializado,
          dispositivoConectado: diagnostico.dispositivoConectado,
          dispositivoListo: diagnostico.dispositivoListo,
          version: diagnostico.versionSDK,
        },
        mensaje: 'Diagnóstico completado'
      };
    } catch (error) {
      return {
        status: 'ERROR',
        detalles: {
          error: error.message
        },
        mensaje: 'Error durante el diagnóstico del dispositivo'
      };
    }
  }

  @Post('led/:estado')
  async controlLED(@Param('estado') estado: string) {
    const encender = estado === 'on';
    const resultado = await this.secugenService.setLED(encender);
    
    return {
      status: resultado ? 'OK' : 'ERROR',
      mensaje: resultado 
        ? `LED ${encender ? 'encendido' : 'apagado'} correctamente`
        : 'Error al controlar el LED'
    };
  }
}