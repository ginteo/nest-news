import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateAdminDto {
  @ApiProperty({ type: String, description: '账号', example: 'test@qq.com' })
  @IsEmail()
  @IsString()
  readonly account: string

  @ApiProperty({ type: String, description: '密码', example: 'test' })
  @MinLength(4)
  @IsString()
  readonly password: string
}
