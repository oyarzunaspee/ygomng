export type FilterType = {
    saga: string[];
    arc: string[];
    duel: string[];
    characters: string[]
}

export type FilterResponse = {
    status: number;
    filters: FilterType;
}