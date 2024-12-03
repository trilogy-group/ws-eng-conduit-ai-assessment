// export class CreateArticleDto {
//   readonly title: string;
//   readonly description: string;
//   readonly body: string;
//   readonly tagList: string[];
// }

import { IsArray, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly tagList: string[];

  @IsArray()
  readonly tags: string[];
}

//end