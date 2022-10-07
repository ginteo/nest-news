import { PaginationQueryDto } from '@libs/common/dto/pagination-query.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class PaginationRoleDto extends PaginationQueryDto {
  @ApiPropertyOptional({ type: String, description: '角色名称模糊搜索' })
  @IsOptional()
  name?: string
}
