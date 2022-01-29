export type Pagination<T> = {
  pageInfo: PageInfo,
  edges: EnquiriesEdge<T>[],
  nodes: T[],
  totalCount: number,
}

type PageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string,
}

type EnquiriesEdge<T> = {
  cursor: string,
  node: T,
}
