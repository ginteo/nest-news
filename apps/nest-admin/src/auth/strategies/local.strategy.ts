import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { compareSync } from 'bcryptjs'
import { IStrategyOptions, Strategy } from 'passport-local'
import { AdminService } from '../../admin/admin.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super({
      usernameField: 'account',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  async validate(account: string, password: string) {
    // 根据账号查找管理员是否存在
    const admin = await this.adminService.findOneByAccout(account)

    // 存在且密码一致
    if (admin && compareSync(password, admin.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = admin

      return result
    }

    throw new BadRequestException('账号不存在或密码错误')
  }
}
