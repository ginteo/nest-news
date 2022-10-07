import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { PaginationAdminDto } from './dto/pagination-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

@Controller('admin')
@ApiTags('管理员')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: '添加管理员' })
  async create(@Body() createAdminDto: CreateAdminDto) {
    // 管理员账号是否已注册
    const admin = await this.adminService.findOneByAccout(
      createAdminDto.account
    )
    if (admin) {
      throw new BadRequestException('账号已注册')
    }

    // 密码加密
    const hashPassword = hashSync(createAdminDto.password)

    return this.adminService.create({
      ...createAdminDto,
      password: hashPassword
    })
  }

  @Get()
  @ApiOperation({ summary: '获取管理员列表' })
  findAll(@Query() paginationQueryDto: PaginationAdminDto) {
    return this.adminService.findAll(paginationQueryDto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取管理员详情' })
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改管理员信息' })
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除管理员' })
  async remove(@Param('id') id: number) {
    return this.adminService.remove(id)
  }
}
