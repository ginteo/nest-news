import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException
} from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PaginationRoleDto } from './dto/pagination-role.dto'

@Controller('role')
@ApiTags('角色')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '添加角色' })
  async create(@Body() createRoleDto: CreateRoleDto) {
    // 查询角色名称是否已使用
    const role = await this.roleService.findOneByName(createRoleDto.name)
    if (role) {
      throw new BadRequestException('角色名已存在')
    }

    return this.roleService.create(createRoleDto)
  }

  @Get()
  @ApiOperation({ summary: '获取角色列表' })
  findAll(@Query() paginationQuery: PaginationRoleDto) {
    return this.roleService.findAll(paginationQuery)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取角色详情' })
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改角色详情' })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  remove(@Param('id') id: number) {
    return this.roleService.remove(id)
  }
}
