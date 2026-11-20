import type { FilterType } from "./types"


const filterData = (fetchedData: FilterType) => {


    const FilterData = {
        ...fetchedData,
        tabList: ["volumes", "chapters", "pages"],
        tabFields: {
          volumes: ["bunkoban", "saga"],
          chapters: ["arc", "duel", "characters"],
          pages: ["page_filter"]
        },
        characterList: fetchedData.groups.flatMap(group => group["characters"].map(({ short }) => short)),
        pageFilterList: fetchedData.page.flatMap(item => item),
        editionExcludedPageFilters: {
            bunkoban: ["extra_illust", "game"],
            original: ["tarot"]
        }
    }
    return FilterData;
}

export default filterData;