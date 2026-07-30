import { ApiProperty } from '@nestjs/swagger';

export class RosterItemDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  username!: string;

  @ApiProperty({ description: 'Total number of articles authored by the user' })
  articles!: number;

  @ApiProperty({ description: 'Total number of favorites received across all their articles' })
  favorites!: number;

  @ApiProperty({
    nullable: true,
    type: String,
    description: 'ISO date string of the first posted article, or null if never posted',
  })
  firstArticleDate!: string | null;
}

export class RosterResponseDto {
  @ApiProperty({ type: [RosterItemDto] })
  roster!: RosterItemDto[];
}
