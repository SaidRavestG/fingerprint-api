import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CaptureFingerprintDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'user123'
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
} 