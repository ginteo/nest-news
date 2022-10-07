import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './entities/admin.entity'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), RoleModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
