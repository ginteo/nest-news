import { PaginationQueryDto } from '@libs/common/dto/pagination-query.dto'
import { AccountStatus, AccountType } from '@libs/common/type'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsEnum } from 'class-validator'
import { $enum } from 'ts-enum-util'

export class PaginationAdminDto extends PaginationQueryDto {
  @ApiPropertyOptional({ type: String, description: '昵称模糊搜索' })
  @IsOptional()
  nickname?: string

  @ApiPropertyOptional({ type: String, description: '手机号模糊搜索' })
  @IsString()
  @IsOptional()
  tel?: string

  @ApiPropertyOptional({
    enum: $enum(AccountStatus).getValues(),
    description: '账号状态搜索，0-禁用，1-启用'
  })
  @IsEnum(AccountStatus)
  @IsOptional()
  status?: number

  @ApiPropertyOptional({
    enum: $enum(AccountStatus).getValues(),
    description: '账号类型搜索，0-普通管理员，1-超级管理员'
  })
  @IsEnum(AccountType)
  @IsOptional()
  type?: number
}
