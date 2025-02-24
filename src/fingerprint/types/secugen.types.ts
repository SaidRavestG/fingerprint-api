// Type definitions for SecuGen SDK
export interface SGFDxDeviceName {
  deviceId: number;
  deviceName: string;
}

export interface SGFDxTemplateFormat {
  TEMPLATE_FORMAT_ANSI378: number;
  TEMPLATE_FORMAT_ISO19794: number;
  TEMPLATE_FORMAT_PROPRIETARY: number;
}

export interface SGFDxSecurityLevel {
  SL_NONE: number;
  SL_LOWEST: number;
  SL_LOWER: number;
  SL_LOW: number;
  SL_BELOW_NORMAL: number;
  SL_NORMAL: number;
  SL_ABOVE_NORMAL: number;
  SL_HIGH: number;
  SL_HIGHER: number;
  SL_HIGHEST: number;
} 