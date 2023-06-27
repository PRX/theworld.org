export interface IImageStyle {
  src: string;
  type?: string;
  width?: number;
  height?: number;
}

export interface IImage {
  id: number;
  type: string;
  url: string;
  alt: string;
  caption: string;
  credit?: string;
  metadata?: {
    width: number;
    height: number;
  };
}
