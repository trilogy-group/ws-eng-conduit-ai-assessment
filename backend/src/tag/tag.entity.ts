import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tag {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property()
  tag: string;
}
