export interface RosterItem {
  id: number;
  username: string;
  articles: number;
  favorites: number;
  firstArticleDate: string | null;
}

export interface RosterResponse {
  roster: RosterItem[];
}
