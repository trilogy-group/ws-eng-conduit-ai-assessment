import { Decoder, number, object, string } from 'decoders';
import { Profile, profileDecoder } from './profile';

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export const commentDecoder: Decoder<Comment> = object({
  id: number,
  createdAt: string,
  updatedAt: string,
  body: string,
  author: profileDecoder,
});
