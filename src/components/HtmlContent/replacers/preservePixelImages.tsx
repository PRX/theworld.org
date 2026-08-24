import { type DOMNode, domToReact } from "html-react-parser";
import type { ReplaceCallback } from "../types";
import { replaceElement } from "@/app/(main)/_components/ContentBody/replacers";

/**
 * Render pixel images as img tags, retaining original attributes.
 */
export const preservePixelImages: ReplaceCallback = replaceElement(
  "img",
  (el) => {
    const { attribs } = el;
    const { style, width, height } = attribs;
    const hasPixelDimensionInStyle = /(width|height):\s?(0|1)px/i.test(style);
    const hasPixelWidth =
      typeof width !== "undefined" && parseInt(`${width}`, 10) <= 1;
    const hasPixelHeight =
      typeof height !== "undefined" && parseInt(`${height}`, 10) <= 1;
    const isPixelImage =
      hasPixelDimensionInStyle || hasPixelWidth || hasPixelHeight;

    if (isPixelImage) {
      return domToReact([el] as DOMNode[]);
    }

    return;
  },
);
