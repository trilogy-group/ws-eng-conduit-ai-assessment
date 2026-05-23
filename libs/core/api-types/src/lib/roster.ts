export interface RosterEntry {
  username: string;
  articlesCount: number;
  favoritesReceived: number;
  firstArticleAt: string | null;
}

export interface RosterResponse {
  roster: RosterEntry[];
}
