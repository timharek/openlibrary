declare namespace OpenLibrary {
  interface ISearch {
    start: number;
    num_found: number;
    docs: IDoc[];
  }

  interface IDoc {
    cover_i: number;
    has_fulltext: boolean;
    edition_count: number;
    title: string;
    author_name: string[];
    first_publish_year: number;
    key: string;
    ia: string[];
    author_key: string[];
    public_scan_b: boolean;
  }

  interface IBook {
    title: string;
    key: string;
    authors: IAuthor[];
    type: {
      key: string;
    };
    description: string;
    covers: number[];
    subject_places: string[];
    subjects: string[];
    subject_people: string[];
    subject_times: string[];
    location: string;
    latest_revision: number;
    revision: number;
    created: IDate;
    last_modified: IDate;
  }

  interface IAuthor {
    author: {
      key: string;
    };
    type: {
      key: string;
    };
  }

  interface IDate {
    type: '/type/datetime';
    value: string;
  }
}
