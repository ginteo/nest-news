import { SetMetadata } from '@nestjs/common'

export const KEEP_KEY = 'keep'

// 保持原数据返回的装饰器
export const Keep = () => SetMetadata(KEEP_KEY, true)
