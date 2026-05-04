import { createStore } from "./createStore"
export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

type Status = {
    status: number;
}

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
}

export type ComparisonResponse = Status & {
    pages: Partial<PageData>[];
    page_range: number[];
}