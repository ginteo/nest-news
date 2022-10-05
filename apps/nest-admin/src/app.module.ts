import { CommonModule } from '@libs/common'
import { Module } from '@nestjs/common'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'

@Module({ imports: [CommonModule, AuthModule, AdminModule] })
export class AppModule {}
