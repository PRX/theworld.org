export interface TwApiCollectionMeta {
  count: number;
  first: number;
  last: number;
  size: number;
  page: number;
  next?: number;
}

export interface TwApiResource<DataType> {
  data: DataType;
}

export interface TwApiCollection<DataType> extends TwApiResource<DataType[]> {
  meta?: TwApiCollectionMeta;
}
