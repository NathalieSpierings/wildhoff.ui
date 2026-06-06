import { ReactNode } from "react";
import { DatagridSortFunc } from "./DatagridSort";
import { DatagridColumnFilterConfig } from "./DatagridColumnFilter";
import { ColorDefinitions } from "../../../../lib/utils/definitions";

export interface DatagridRowConfig<TData, TProp extends Extract<keyof TData, string> = Extract<keyof TData, string>, TTransformedValue = any> {
  prop: TProp;
  title: string;
  sortable?: boolean;

  transformValue?: (value: TData[TProp]) => TTransformedValue;
  useItemOnly?: (item: TData) => ReactNode;
  wrapValue?: (item: TData, value: TTransformedValue) => ReactNode;

  sort?: DatagridSortFunc<TData>;

  cssClass?: string;
  textAlign?: "left" | "center" | "right";
  textMuted?: boolean;

  tooltipContent?: ReactNode;
  showTooltip?: boolean;
  tooltipColor?: ColorDefinitions;
  tooltipArrow?: boolean;

  filter?: DatagridColumnFilterConfig<TData>;  
}
