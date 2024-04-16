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
  // TODO: Transform
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
  // TODO: Transform
  key: z.string(),
  name: z.string(),
  personal_name: z.string(),
  remote_ids: z.object({
    isni: z.string(),
    viaf: z.string(),
    wikidata: z.string(),
  }),
  source_records: z.array(z.string()),
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

export const SubjectResult = z.object(
  {
    // TODO: transform
    key: z.string(),
    name: z.string(),
    subject_type: z.string(),
    work_count: z.number(),
    works: z.array(z.object(
      {
        key: z.string(),
        title: z.string(),
        edition_count: z.number(),
        cover_id: z.number(),
        cover_edition_key: z.string(),
        subject: z.array(z.string()),
        ia_collection: z.array(z.string()),
        lendinglibrary: z.boolean(),
        printdisabled: z.boolean(),
        lending_edition: z.string(),
        lending_identifier: z.string(),
        authors: z.array(z.object({
          key: z.string(),
          name: z.string(),
        })),
        first_publish_year: z.number(),
        ia: z.string(),
        public_scan: z.boolean(),
        has_fulltext: z.boolean(),
        availability: z.object({
          status: z.string(),
          available_to_browse: z.boolean().nullable(),
          available_to_borrow: z.boolean().nullable(),
          available_to_waitlist: z.boolean().nullable(),
          is_printdisabled: z.boolean().nullable(),
          is_readable: z.boolean().nullable(),
          is_lendable: z.boolean().nullable(),
          is_previewable: z.boolean(),
          identifier: z.string(),
          isbn: z.string().nullable(),
          oclc: z.string().nullable(),
          openlibrary_work: z.string().nullable(),
          openlibrary_edition: z.string().nullable(),
          last_loan_date: z.string().nullable(),
          num_waitlist: z.string().nullable(),
          last_waitlist_date: z.string().nullable(),
          is_restricted: z.boolean(),
          is_browseable: z.boolean().nullable(),
          __src__: z.string(),
        }).optional(),
      },
    )),
  },
);

export type Book = z.infer<typeof Book>;
export type Search = z.infer<typeof Search>;
export type ISBNResult = z.infer<typeof ISBNResult>;
export type Author = z.infer<typeof Author>;
export type SubjectResult = z.infer<typeof SubjectResult>;
