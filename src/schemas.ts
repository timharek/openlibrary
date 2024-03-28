import { z } from '../deps.ts';

const Doc = z.object({
  cover_i: z.number().optional(),
  has_fulltext: z.boolean(),
  edition_count: z.number(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  first_publish_year: z.number().optional(),
  key: z.string(),
  ia: z.array(z.string()).optional(),
  author_key: z.array(z.string()).optional(),
  public_scan_b: z.boolean(),
});

export const Search = z.object({
  start: z.number(),
  num_found: z.number(),
  docs: z.array(Doc),
});

const Author = z.object({
  author: z.object({
    key: z.string(),
  }),
  type: z.object({
    key: z.string(),
  }),
});

const Date = z.object({
  type: z.literal('/type/datetime'),
  value: z.string(),
});

export const Book = z.object({
  title: z.string(),
  key: z.string(),
  authors: z.array(Author),
  type: z.object({
    key: z.string(),
  }),
  description: z.string().or(z.object({
    type: z.literal('/type/text'),
    value: z.string(),
  })),
  covers: z.array(z.number()),
  subject_places: z.array(z.string()).optional(),
  subjects: z.array(z.string()),
  subject_people: z.array(z.string()).optional(),
  subject_times: z.array(z.string()).optional(),
  location: z.string().optional(),
  latest_revision: z.number(),
  revision: z.number(),
  created: Date,
  last_modified: Date,
});

export type Book = z.infer<typeof Book>;
export type Search = z.infer<typeof Search>;
