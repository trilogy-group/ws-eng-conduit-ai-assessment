export class CreateArticleDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  // List of co-author emails (BASIC) or user IDs (ADVANCED)
  readonly coAuthors?: string[];
}
