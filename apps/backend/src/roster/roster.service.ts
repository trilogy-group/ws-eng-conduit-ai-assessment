import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { RosterItemDto, RosterResponseDto } from './roster.dto';

@Injectable()
export class RosterService {
  constructor(private readonly em: EntityManager) {}

  async getRoster(): Promise<RosterResponseDto> {
    const rows = await this.em.getConnection().execute(
      'select u.id as id, u.username as username, ' +
        'count(a.id) as articles, ' +
        'coalesce(sum(a.favorites_count), 0) as favorites, ' +
        'min(a.created_at) as firstArticleDate ' +
        'from `user` u ' +
        'left join `article` a on a.author_id = u.id ' +
        'group by u.id, u.username ' +
        'order by favorites desc, articles desc, u.username asc',
    );

    const roster: RosterItemDto[] = rows.map((r: any) => ({
      id: Number(r.id),
      username: String(r.username),
      articles: Number(r.articles ?? 0),
      favorites: Number(r.favorites ?? 0),
      firstArticleDate: r.firstArticleDate ? new Date(r.firstArticleDate).toISOString() : null,
    }));

    return { roster };
  }
}
