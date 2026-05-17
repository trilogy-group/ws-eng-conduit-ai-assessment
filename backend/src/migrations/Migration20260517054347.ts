import { Migration } from '@mikro-orm/migrations';

export class Migration20260517054347 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`article_co_authors\` (\`article_id\` int unsigned not null, \`user_id\` int unsigned not null, primary key (\`article_id\`, \`user_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`article_co_authors\` add index \`article_co_authors_article_id_index\`(\`article_id\`);`);
    this.addSql(`alter table \`article_co_authors\` add index \`article_co_authors_user_id_index\`(\`user_id\`);`);

    this.addSql(`alter table \`article_co_authors\` add constraint \`article_co_authors_article_id_foreign\` foreign key (\`article_id\`) references \`article\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`article_co_authors\` add constraint \`article_co_authors_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`article\` modify \`created_at\` date not null, modify \`updated_at\` date not null;`);

    this.addSql(`alter table \`comment\` modify \`created_at\` date not null, modify \`updated_at\` date not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`article_co_authors\`;`);

    this.addSql(`alter table \`article\` modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);

    this.addSql(`alter table \`comment\` modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);
  }

}
