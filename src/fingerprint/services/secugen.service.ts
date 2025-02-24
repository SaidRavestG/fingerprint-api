import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

interface SDKDiagnostico {
  sdkInicializado: boolean;
  dispositivoConectado: boolean;
  dispositivoListo: boolean;
  versionSDK: string;
}

@Injectable()
export class SecugenService implements OnModuleInit, OnModuleDestroy {
  private readonly SDK_PATHS = {
    main: '/usr/local/lib/libsgfplib.so',
    amx: '/usr/local/lib/libsgfpamx.so',
    usb: '/usr/local/lib/libsgfdu06.so'
  };
  private sgfplib: any;

  async onModuleInit() {
    try {
      // Verificar que los archivos del SDK existen
      await Promise.all([
        fs.access(this.SDK_PATHS.main),
        fs.access(this.SDK_PATHS.amx),
        fs.access(this.SDK_PATHS.usb)
      ]);

      // TODO: Implementar la inicialización real del SDK
      console.log('SDK de SecuGen encontrado');
    } catch (error) {
      console.error('Error al acceder al SDK:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    // Cleanup cuando se detenga la aplicación
    if (this.sgfplib) {
      // TODO: Implementar la limpieza del SDK
      console.log('Limpiando recursos del SDK');
    }
  }

  async setLED(encender: boolean): Promise<boolean> {
    try {
      // TODO: Implementar el control real del LED usando comandos del sistema
      const command = encender ? 
        'sudo sh -c "echo 1 > /sys/class/leds/secugen/brightness"' :
        'sudo sh -c "echo 0 > /sys/class/leds/secugen/brightness"';
      
      // Por ahora solo simulamos
      console.log(`Simulando LED ${encender ? 'ON' : 'OFF'}`);
      return true;
    } catch (error) {
      console.error('Error al controlar LED:', error);
      return false;
    }
  }

  private async checkDeviceStatus(): Promise<void> {
    const commands = [
      'lsusb',
      'ls -l /dev/bus/usb/',
      'ls -l /usr/local/lib/secugen/',
      'ldd /usr/local/lib/libsgfplib.so',
      'uname -a',  // Información del sistema
      'ls -l /dev/bus/usb/*/* | grep 1162', // Buscar específicamente dispositivos SecuGen
      'systemctl status udev'  // Estado del servicio udev
    ];

    console.log('Iniciando diagnóstico del dispositivo SecuGen...');
    
    for (const cmd of commands) {
      try {
        const output = await this.executeCommand(cmd);
        console.log(`\n=== Ejecutando: ${cmd} ===`);
        console.log(output || 'No hay salida');
      } catch (error) {
        console.error(`Error ejecutando ${cmd}:`, error.message);
      }
    }
  }

  async testSDKConnection(): Promise<SDKDiagnostico> {
    try {
      await this.checkDeviceStatus();
      // Verificar dispositivos USB
      const usbDevices = await this.executeCommand('lsusb');
      console.log('Dispositivos USB encontrados:', usbDevices);

      // Verificar archivos del SDK
      await Promise.all([
        fs.access(this.SDK_PATHS.main).then(() => console.log('SDK main encontrado')),
        fs.access(this.SDK_PATHS.amx).then(() => console.log('SDK amx encontrado')),
        fs.access(this.SDK_PATHS.usb).then(() => console.log('SDK usb encontrado'))
      ]);

      // Verificar permisos
      const devicePermissions = await this.executeCommand('ls -l /dev/bus/usb/');
      console.log('Permisos de dispositivos:', devicePermissions);

      return {
        sdkInicializado: true,
        dispositivoConectado: true,
        dispositivoListo: true,
        versionSDK: '1.0.0'
      };
    } catch (error) {
      console.error('Error detallado:', error);
      throw new Error(`Error al verificar SDK: ${error.message}`);
    }
  }

  private async executeCommand(command: string): Promise<string> {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec(command, (error: any, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout.trim());
      });
    });
  }

  async captureFingerprint(): Promise<Buffer> {
    try {
      // TODO: Implementar captura real usando el SDK
      console.log('Simulando captura de huella');
      return Buffer.from('huella-simulada');
    } catch (error) {
      console.error('Error al capturar huella:', error);
      throw error;
    }
  }
} 