export interface ITableColumn {
  columnName: string;
  columnClass?: string;
  style?: string;
  sortable?: boolean;
  property: string;
  width?: string;
}
export interface ITableConfig {
  selection?: boolean;
  columns: ITableColumn[];
}

export interface ButtonItems {
  label: string;
  icon: string;
  command: () => void;
}

export interface IDropdownItem {
  id: string;
  name: string;
  type?: number;
}

export interface IProductDropdown {
  code: string;
  name: string;
  description: string;
}

export interface IProductDropdown {
  code: string;
  name: string;
  description: string;
}

export interface Image {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}
