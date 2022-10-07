import { AccountStatus } from '@libs/common/type'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator'
import { $enum } from 'ts-enum-util'

export class UpdateAdminDto {
  @ApiPropertyOptional({ type: String, description: '昵称', example: '张三' })
  @IsOptional()
  nickname?: string

  @ApiPropertyOptional({
    type: String,
    description: '手机号',
    example: '13377886699'
  })
  @IsMobilePhone()
  @IsString()
  @IsOptional()
  tel?: string

  @ApiPropertyOptional({
    enum: $enum(AccountStatus).getValues(),
    description: '账号状态，0-禁用，1-启用',
    default: 1
  })
  @IsEnum(AccountStatus)
  @IsOptional()
  status?: number

  @ApiPropertyOptional({
    type: Number,
    description: '分配角色，角色id',
    default: 4
  })
  @IsOptional()
  roleId?: number
}
