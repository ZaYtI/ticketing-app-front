export interface ChartInfo {
    tickets_12_last_months: {
        m: number;
        count: number;
    }[];
    tickets_by_status: {
        status: number;
        count: number;
    }[];
}
