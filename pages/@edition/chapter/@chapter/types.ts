export type PageData = {
    number: number;
    link: string;
    double: boolean;
    content: boolean;
}

export type ComparisonResponse = {
    status: number;
    pages: PageData[];
    page_range: number[];
}