import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RosterResponse, RosterService } from './roster.service';

@ApiTags('roster')
@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  @ApiOperation({ summary: 'Get roster of authors' })
  @ApiResponse({ status: 200, description: 'Return the conduit roster.' })
  async findAll(): Promise<RosterResponse> {
    return this.rosterService.findAll();
  }
}
