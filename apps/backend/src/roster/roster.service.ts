import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

export interface RosterUser {
  username: string;
  articlesCount: number;
  favoritesReceived: number;
  firstArticleAt: string | null;
}

export interface RosterResponse {
  roster: RosterUser[];
}

@Injectable()
export class RosterService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<RosterResponse> {
    const rows = await this.em.getConnection().execute(
      `
        SELECT
          u.username AS username,
          COUNT(a.id) AS articlesCount,
          COALESCE(SUM(a.favorites_count), 0) AS favoritesReceived,
          MIN(a.created_at) AS firstArticleAt
        FROM \`user\` u
        LEFT JOIN \`article\` a ON a.author_id = u.id
        GROUP BY u.id, u.username
        ORDER BY favoritesReceived DESC, articlesCount DESC, u.username ASC
      `,
    );

    return {
      roster: rows.map((row: any) => ({
        username: row.username,
        articlesCount: Number(row.articlesCount ?? row.articles_count ?? 0),
        favoritesReceived: Number(row.favoritesReceived ?? row.favorites_received ?? 0),
        firstArticleAt: row.firstArticleAt
          ? new Date(row.firstArticleAt).toISOString()
          : row.first_article_at
          ? new Date(row.first_article_at).toISOString()
          : null,
      })),
    };
  }
}
