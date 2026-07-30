import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';

@Module({
  controllers: [RosterController],
  imports: [MikroOrmModule.forFeature({ entities: [User, Article] })],
  providers: [RosterService],
})
export class RosterModule {}
