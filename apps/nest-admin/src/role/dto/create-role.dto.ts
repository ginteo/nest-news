import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ type: String, description: '角色名称', example: '社长' })
  @IsString()
  name: string

  @ApiProperty({ type: String, description: '角色描述', example: '所有权限' })
  @IsString()
  @IsOptional()
  remark?: string
}
