import { Common } from '@libs/common/entities/common.entity'
import { AccountStatus, AccountType } from '@libs/common/type'
import { ApiHideProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('admin')
export class Admin extends Common {
  @Column({ unique: true })
  account: string

  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  nickname: string

  @Column({ nullable: true })
  tel: string

  @Column({
    type: 'tinyint',
    default: AccountStatus.NORMAL,
    comment: '账号状态，0-禁用，1-启用'
  })
  status: number

  @Column({
    type: 'tinyint',
    default: AccountType.ORDINARY_USER,
    comment: '账号类型，0-普通管理员，1-超级管理员'
  })
  type: number

  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  @Column({ nullable: true, select: false })
  refreshToken: string
}
