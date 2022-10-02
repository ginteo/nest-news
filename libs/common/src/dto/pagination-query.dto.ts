import { ApiProperty } from '@nestjs/swagger'
import { IsPositive } from 'class-validator'

export class PaginationQueryDto {
  @ApiProperty({ description: 'offset表示当前是第几页', example: 1 })
  @IsPositive()
  readonly offset: number

  @ApiProperty({ description: 'limit表示每页显示多少条数据', example: 10 })
  @IsPositive()
  readonly limit: number
}
