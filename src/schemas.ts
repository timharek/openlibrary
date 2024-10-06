import { z } from 'zod';

const key = z.string().transform((value) => {
  const split = value.split('/');
  if (split.length <= 1) {
    return value;
  }
  return split[split.length - 1];
});

const Doc = z.object({
  cover_i: z.number().optional(),
  has_fulltext: z.boolean(),
  edition_count: z.number(),
  title: z.string(),
  author_name: z.array(z.string()).optional().default([]),
  first_publish_year: z.number().optional(),
  key: z.string(),
  ia: z.array(z.string()).optional().default([]),
  author_key: z.array(z.string()).optional().default([]),
  public_scan_b: z.boolean(),
  isbn: z.array(z.string()).optional().default([]),
  language: z.array(z.string()).optional().default([]),
});

export const Search = z.object({
  start: z.number(),
  num_found: z.number(),
  docs: z.array(Doc).default([]),
});

const AuthorObj = z
  .object({
    author: z.object({
      key: z.string(),
    }),
    type: z.object({
      key: z.string(),
    }),
  })
  .or(
    z
      .object({
        key: z.string(),
      })
      .transform((author) => ({
        author,
        type: {
          key: "/type/author_role",
        },
      })),
  );

const Date = z.object({
  type: z.literal('/type/datetime'),
  value: z.string(),
});

const StringOrTextObject = z
  .string()
  .or(
    z.object({
      type: z.literal('/type/text'),
      value: z.string(),
    })
  )
  .transform((desc) => {
    if (typeof desc === 'string') {
      return desc;
    }
    return desc.value;
  })

export const Book = z.object({
  /**
   * Arrays of external platform identifiers
   * 
   * @example { goodreads: ["1507552"], librarything: ["6446"] }
  */
  identifiers: z
    .record(
      z.string(),
      z.array(z.string()),
    )
    .optional(),
  title: z.string().optional(),
  key,
  authors: z.array(AuthorObj).optional(),
  type: z.object({
    key: z.enum(['/type/work', '/type/redirect', '/type/edition']),
  }),
  description: StringOrTextObject.optional(),
  covers: z.array(z.number()).optional().default([]),
  subject_places: z.array(z.string()).optional().default([]),
  subjects: z.array(z.string()).optional().default([]),
  subject_people: z.array(z.string()).optional().default([]),
  subject_times: z.array(z.string()).optional().default([]),
  /**
   * Redirect path for when `type.key` is `/type/redirect`.
   * Redirects are handled automatically in `book.get`.
   */
  location: z.string().optional(),
  contributions: z.array(z.string()).optional(),
  /**
   * Array of colon-separated source identifiers
   * 
   * @example `ia:fantasticmrfox00dahl_834` = `archive.org/details/fantasticmrfox00dahl_834`
   */
  source_records: z.array(z.string()).optional().default([]),
  local_id: z.array(z.string()).optional().default([]),
  // Not confident that this could be a string but I saw that `description`
  // unioned a /type/text object so I thought it would make sense for them
  // to be the same.
  first_sentence: StringOrTextObject.optional(),
  number_of_pages: z.number().optional(),
  works: z.array(z.object({ key })).optional(),
  /** Internet archive ID */
  ocaid: z.string().optional(),
  isbn_10: z.array(z.string()).optional(),
  isbn_13: z.array(z.string()).optional(),
  latest_revision: z.number(),
  revision: z.number(),
  created: Date,
  last_modified: Date,
});

export const ISBNResult = z.object({
  works: z.array(z.object({ key: z.string() })).default([]),
});

const stringDate = z.string(z.date());

export const Author = z.object({
  key,
  name: z.string(),
  personal_name: z.string().optional(),
  remote_ids: z.object({
    isni: z.string().optional(),
    viaf: z.string().optional(),
    wikidata: z.string().optional(),
  }).optional(),
  source_records: z.array(z.string()).optional().default([]),
  alternate_names: z.array(z.string()).optional().default([]),
  links: z.array(z.object({
    url: z.string().url(),
    title: z.string(),
    type: z.object({
      key: z.string(),
    }),
  })).optional().default([]),
  photos: z.array(z.number()).optional().default([]),
  birth_date: stringDate.optional(),
  type: z.object({
    key: z.string(),
  }),
  latest_revision: z.number().optional(),
  revision: z.number(),
  created: z.object({
    type: z.string(),
    value: stringDate,
  }).optional(),
  last_modified: z.object({
    type: z.string(),
    value: stringDate,
  }),
});

export const SubjectResult = z.object(
  {
    key,
    name: z.string(),
    subject_type: z.string(),
    work_count: z.number(),
    works: z.array(z.object(
      {
        key: z.string(),
        title: z.string(),
        edition_count: z.number(),
        cover_id: z.number(),
        cover_edition_key: z.string().nullable(),
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
