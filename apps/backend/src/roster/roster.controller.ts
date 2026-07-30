import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RosterResponseDto } from './roster.dto';
import { RosterService } from './roster.service';

@ApiTags('roster')
@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @ApiOperation({ summary: 'Get roster of authors' })
  @ApiOkResponse({ type: RosterResponseDto })
  @Get()
  async getRoster(): Promise<RosterResponseDto> {
    return this.rosterService.getRoster();
  }
}
