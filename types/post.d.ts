import { z } from 'zod';
import { postSchema } from '~/lib/api.mjs';

export namespace PostType {
  export type Meta = z.infer<typeof postSchema>;
}
