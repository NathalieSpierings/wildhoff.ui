export type DatagridColumnFilterType = "text" | "select" | "date";

export interface DatagridColumnFilterConfig<TData = any> {
  type: DatagridColumnFilterType;
  multiSelect?: boolean;

  // statisch
  options?: { label: string; value: string }[];

  // dynamisch
  optionsSource?: (data: TData[]) => any[];
  mapOption?: (value: any) => { label: string; value: string };
}
