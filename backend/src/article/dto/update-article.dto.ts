import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly body?: string;

  @IsArray()
  @IsOptional()
  readonly tagList?: string[];

  @IsString()  
  @IsOptional()
  readonly summary?: string;
}
