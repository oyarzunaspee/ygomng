import { createStore } from "./createStore"
export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

type Status = {
    status: number;
}


// MANGA

export type ChapterData = {
    number: number;
    title: string;
    jpn: string;
}

export type VolumeData = {
    counter: number;
    title: string;
    cover: string;
    chapters: ChapterData[];
}

export type VolumeResponse = Status & {
    volumes: VolumeData[];
}

export type PageData = {
    number: number;
    link: string;
    double: boolean;
    content: boolean;
}

export type ChapterResponse = Status & {
    pages: PageData[];
    next_limit: number;
}

export type ComparisonResponse = Status & {
    pages: Partial<PageData>[];
    page_range: number[];
}

// BOOKS

export type BookData = {
    type: string;
    short: string;
    _id: string;
    cover: string;
    title: string;
}

export type BooksResponse = Status & {
    books: BookData[];
}

export type BookPage = {
    number: number;
    link: string;
    full_link: string;
}

export type IndividualBook = {
    type: string;
    title: string;
    short: string;
    jpn: string;
    publisher: string;
    author: string | null;
    year: number;
    pages: BookPage[];
}

export type BookResponse = Status & {
    book: IndividualBook;
}