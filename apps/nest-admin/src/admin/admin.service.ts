import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hashSync } from 'bcryptjs'
import { Like, Repository } from 'typeorm'
import { CreateAdminDto } from './dto/create-admin.dto'
import { PaginationAdminDto } from './dto/pagination-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) {}

  create(createAdminDto: CreateAdminDto) {
    const { account, password } = createAdminDto
    // 密码加密
    const bcryptPassword = hashSync(password)

    return this.adminRepository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values({ account, password: bcryptPassword })
      .execute()
  }

  async findAll(paginationQueryDto: PaginationAdminDto) {
    const { nickname, tel, status, type, offset, limit } = paginationQueryDto
    const where = {
      nickname: nickname ? Like(`%${nickname}%`) : null,
      tel: tel ? Like(`%${tel}%`) : null,
      status: status ?? null,
      type: type ?? null
    }

    const [list, count] = await this.adminRepository.findAndCount({
      where,
      skip: (offset - 1) * limit,
      take: limit
    })

    return { list, count, page_index: offset, page_size: limit }
  }

  findOne(id: number) {
    return this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.id = :id', { id })
      .getOne()
  }

  findOneByAccout(account: string) {
    return this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.account = :account', { account })
      .getOne()
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository
      .createQueryBuilder()
      .update(Admin)
      .set({ ...updateAdminDto })
      .where('id = :id', { id })
      .execute()
  }

  remove(id: number) {
    return this.adminRepository
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where('id = :id', { id })
      .execute()
  }
}
