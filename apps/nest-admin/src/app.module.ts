import { CommonModule } from '@libs/common'
import { Module } from '@nestjs/common'
import { AdminModule } from './admin/admin.module'

@Module({ imports: [CommonModule, AdminModule] })
export class AppModule {}
