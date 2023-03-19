import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsResolver } from './columns.resolver';

@Module({
  providers: [ColumnsResolver, ColumnsService],
})
export class ColumnsModule {}
