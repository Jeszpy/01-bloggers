

export const getPaginationData = (query: any) => {
    const defaultPageNumber = 1
    const defaultPageSize = 10
    const defaultSearchNameTern = null
    const pageNumber = query.page ? +query.page : defaultPageNumber
    const pageSize = query.pageSize ? +query.pageSize : defaultPageSize
    const searchNameTern = query.searchNameTern ? query.searchNameTern : defaultSearchNameTern
    const skipPagesCount = (pageNumber - 1) * pageSize
    return {pageNumber, pageSize, skipPagesCount, searchNameTern}
}