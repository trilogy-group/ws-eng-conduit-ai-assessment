import { Migration } from '@mikro-orm/migrations';

export class Migration20250425154958 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `article_co_authors` (`article_id` int unsigned not null, `user_id` int unsigned not null, primary key (`article_id`, `user_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `article_co_authors` add index `article_co_authors_article_id_index`(`article_id`);');
    this.addSql('alter table `article_co_authors` add index `article_co_authors_user_id_index`(`user_id`);');

    this.addSql('alter table `article_co_authors` add constraint `article_co_authors_article_id_foreign` foreign key (`article_id`) references `article` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `article_co_authors` add constraint `article_co_authors_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `article` add `locked_by_id` int unsigned null, add `locked_at` datetime null;');
    this.addSql('alter table `article` add constraint `article_locked_by_id_foreign` foreign key (`locked_by_id`) references `user` (`id`) on update cascade on delete set null;');
    this.addSql('alter table `article` add index `article_locked_by_id_index`(`locked_by_id`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `article_co_authors`;');

    this.addSql('alter table `article` drop foreign key `article_locked_by_id_foreign`;');

    this.addSql('alter table `article` drop index `article_locked_by_id_index`;');
    this.addSql('alter table `article` drop `locked_by_id`;');
    this.addSql('alter table `article` drop `locked_at`;');
  }

}
