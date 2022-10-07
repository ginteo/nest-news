import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { PaginationRoleDto } from './dto/pagination-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto)
  }

  async findAll(paginationQuery: PaginationRoleDto) {
    const { name, offset, limit } = paginationQuery
    const where = {
      name: name ? Like(`%${name}%`) : null
    }

    const [list, count] = await this.roleRepository.findAndCount({
      where,
      skip: (offset - 1) * limit,
      take: limit
    })

    return { list, count, page_index: offset, page_size: limit }
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } })
  }

  findOneByName(name: string) {
    return this.roleRepository.findOne({ where: { name } })
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto)
  }

  remove(id: number) {
    return this.roleRepository.delete(id)
  }
}
