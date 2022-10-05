import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '登录账号', example: 'test@qq.com' })
  @IsNotEmpty()
  @IsString()
  account: string

  @ApiProperty({ description: '登录密码', example: 'test' })
  @IsNotEmpty()
  @IsString()
  password: string
}
