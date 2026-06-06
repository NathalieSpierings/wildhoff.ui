import { PaginationData } from "../Pagination";
import { DatagridRowConfig } from "./DatagridRowConfig";
import { DatagridSortConfig } from "./DatagridSort";

export type ColumnFilters<TData> = {
    [K in keyof TData]?: TData[K] | TData[K][];
};

export interface DatagridGetDataArguments<TData> {
  searchTerm: string;
  sort: DatagridSortConfig | undefined;
  propertyConfigs?: DatagridRowConfig<TData>[];
  pagination: PaginationData;
  columnFilters: ColumnFilters<TData>;
}

export type FilterUpdateFunc<TData> = (
  args: DatagridGetDataArguments<TData>
) => void;
