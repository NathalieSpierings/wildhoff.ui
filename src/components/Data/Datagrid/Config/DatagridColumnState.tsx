export type DatagridPinnedPosition = "left" | "right" | null;

export interface DatagridColumnState {
  prop: string; 
  width: number;
  visible: boolean;
  pinned: DatagridPinnedPosition;
}
