import { Common } from '@libs/common/entities/common.entity'
import { Column, Entity } from 'typeorm'

@Entity('role')
export class Role extends Common {
  @Column({ unique: true })
  name: string

  @Column({ nullable: true, comment: '角色描述' })
  remark: string
}
