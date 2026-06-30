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

export type VolumeResponse = {
    status: number;
    volumes: VolumeData[];
}

export type PageData = {
    number: number;
    link: string;
    double: boolean;
    content: boolean;
}

export type ChapterResponse = {
    status: number;
    pages: PageData[];
    next_limit: number;
}