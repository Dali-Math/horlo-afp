declare module "react-pageflip" {
  import * as React from "react";
  export interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startPage?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}
