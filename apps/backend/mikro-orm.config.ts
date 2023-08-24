import { LoadStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import { join } from 'path';
import { User } from './src/user/user.entity';
import { Tag } from './src/tag/tag.entity';
import { Article } from './src/article/article.entity';
import { Comment } from './src/article/comment.entity';
import { InitialMigration } from './src/migrations/InitialMigration';

export default defineConfig({
  host: 'localhost',
  port: 3306,
  user: 'conduit',
  password: 'conduit',
  dbName: 'conduit',
  migrations: {
    migrationsList: [
      {
        name: 'InitialMigration',
        class: InitialMigration,
      },
    ],
  },
  entities: [User, Tag, Article, Comment],
  discovery: { disableDynamicFileAccess: true },
  seeder: {
    pathTs: join(__dirname, 'src', 'seeders'),
  },
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator, SeedManager],
});
