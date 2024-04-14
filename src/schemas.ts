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

const AuthorObj = z.object({
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
  authors: z.array(AuthorObj),
  type: z.object({
    key: z.string(),
  }),
  description: z.string().or(z.object({
    type: z.literal('/type/text'),
    value: z.string(),
  })).transform((desc) => {
    if (typeof desc === 'string') {
      return desc;
    }
    return desc.value;
  }),
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

export const ISBNResult = z.object({
  works: z.array(z.object({ key: z.string() })),
});

const stringDate = z.string(z.date());

export const Author = z.object({
  personal_name: z.string(),
  remote_ids: z.object({
    isni: z.string(),
    viaf: z.string(),
    wikidata: z.string(),
  }),
  source_records: z.array(z.string()),
  key: z.string(),
  alternate_names: z.array(z.string()),
  links: z.array(z.object({
    url: z.string().url(),
    title: z.string(),
    type: z.object({
      key: z.string(),
    }),
  })),
  photos: z.array(z.number()),
  birth_date: stringDate,
  type: z.object({
    key: z.string(),
  }),
  name: z.string(),
  latest_revision: z.number(),
  revision: z.number(),
  created: z.object({
    type: z.string(),
    value: stringDate,
  }),
  last_modified: z.object({
    type: z.string(),
    value: stringDate,
  }),
});

export type Book = z.infer<typeof Book>;
export type Search = z.infer<typeof Search>;
export type ISBNResult = z.infer<typeof ISBNResult>;
export type Author = z.infer<typeof Author>;
