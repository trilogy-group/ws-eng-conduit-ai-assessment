import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsArray()
  @IsOptional()
  readonly tagList?: string[];

  @IsString()
  @IsOptional()
  readonly summary?: string;
}

