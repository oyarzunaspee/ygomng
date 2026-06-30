export type BookData = {
    type: string;
    short: string;
    _id: string;
    cover: string;
    title: string;
}

export type BooksResponse = {
    status: number;
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

export type BookResponse = {
    status: number;
    book: IndividualBook;
}