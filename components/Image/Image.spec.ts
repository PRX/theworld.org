import { createMuiTheme } from '@material-ui/core/styles';
import {
  IImageStyle,
  determineIfIResponsiveConfig,
  findBestStyle,
  generateStaticAttributes,
  generateResponsiveAttributes
} from './index';

describe('Image', () => {
  const theme = createMuiTheme({});
  const mockImageStyles: IImageStyle[] = [
    {
      src: '/images/foo-100px.jpg',
      info: { width: 100 }
    },
    {
      src: '/images/foo-200px.jpg',
      info: { width: 200 }
    },
    {
      src: '/images/foo-300px.jpg',
      info: { width: 300 }
    },
    {
      src: '/images/foo-400px.jpg',
      info: { width: 400 }
    },
    {
      src: '/images/foo-500px.jpg',
      info: { width: 500 }
    }
  ];

  describe('determineIfIResponsiveConfig', () => {
    test('should return true for responsive config', () => {
      expect(determineIfIResponsiveConfig({ xl: 100 })).toBeTruthy();
    });

    test('should return false for numbers', () => {
      expect(determineIfIResponsiveConfig(100)).toBeFalsy();
    });
  });

  describe('findBestStyle', () => {
    test('should return image style with width 400', () => {
      expect(findBestStyle(350, mockImageStyles).info.width).toEqual(400);
    });
  });

  describe('generateStaticAttributes', () => {
    const mockResult = {
      srcSet:
        '/images/foo-100px.jpg 1x,/images/foo-200px.jpg 1.5x,/images/foo-200px.jpg 2x,/images/foo-300px.jpg 2.5x,/images/foo-300px.jpg 3x',
      src: '/images/foo-300px.jpg',
      width: 100
    };

    test('should trsansform image styles array to static image attributes', () => {
      const { srcSet, src, width } = generateStaticAttributes(100, mockImageStyles);

      expect(srcSet).toEqual(mockResult.srcSet);
      expect(src).toEqual(mockResult.src);
      expect(width).toEqual(mockResult.width);
    });
  });

  describe('generateResponsiveAttributes', () => {
    const widths = {
      xs: '100vw',
      sm: 10,
      md: 50,
      lg: 100,
      xl: 500
    };
    const mockResult = {
      srcSet:
        '/images/foo-100px.jpg 100w,/images/foo-200px.jpg 200w,/images/foo-300px.jpg 300w,/images/foo-400px.jpg 400w,/images/foo-500px.jpg 500w',
      sizes:
        '(max-width:599.95px) 100vw,(max-width:959.95px) 10px,(max-width:1279.95px) 50px,(max-width:1919.95px) 100px,500px',
      src: '/images/foo-500px.jpg'
    };

    test('should trsansform image styles array to responsive image attributes', () => {
      const {
        srcSet,
        sizes,
        src,
        width,
        height
      } = generateResponsiveAttributes(widths, mockImageStyles, theme);

      expect(srcSet).toEqual(mockResult.srcSet);
      expect(sizes).toEqual(mockResult.sizes);
      expect(src).toEqual(mockResult.src);
      expect(width).toBeNull();
      expect(height).toBeNull();
    });
  });
});
