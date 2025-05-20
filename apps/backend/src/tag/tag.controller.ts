import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ITagsRO } from './tag.interface';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<ITagsRO> {
    return this.tagService.findAll();
  }

  @ApiOperation({ summary: 'Create tags' })
  @ApiResponse({ status: 201, description: 'Tags have been successfully created.' })
  @Post()
  async create(@Body('tagList') tagList: string[]): Promise<{ success: boolean; message: string; tags: Tag[] }> {
    console.log('tagList', tagList);
    return this.tagService.create(tagList);
  }
}
