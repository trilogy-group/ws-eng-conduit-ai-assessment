import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    return { tags: tags.map((tag) => tag.tag) };
  }

  async create(tagList: string[]): Promise<{ success: boolean; message: string; tags: Tag[] }> {
    const tags: Tag[] = [];
    for (const tagName of tagList) {
      let tag = await this.tagRepository.findOne({ tag: tagName });
      if (!tag) {
        tag = this.tagRepository.create({ tag: tagName });
        this.em.persist(tag);
      }
      tags.push(tag);
    }
    await this.em.flush();
    return {
      success: true,
      message: 'Tags created or found successfully.',
      tags,
    };
  }
}
