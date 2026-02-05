export class CreateArticleDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  // Optional co-author inputs (either IDs for advanced UI, or emails for basic CSV input)
  readonly coAuthorIds?: number[];
  readonly coAuthorEmails?: string[];
}
