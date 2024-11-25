export interface PaginatedMeta {
    total_items: number,
    current_page: number,
    total_pages: number,
    next_pages: string|null;
}


export interface IPaginatedResponse<T> {
    items: T[];
    meta: PaginatedMeta;
}
