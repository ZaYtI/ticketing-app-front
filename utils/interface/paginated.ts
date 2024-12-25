export type PaginatedMeta = {
    total_items: number;
    current_page: number;
    total_pages: number;
    next_pages: string|null;
}


export type PaginatedResponse<T> = {
    items: T[];
    meta: PaginatedMeta;
}
