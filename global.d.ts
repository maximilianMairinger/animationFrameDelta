// -------- edom start

//TODO: use namespace (edom.EasingCls)

type Data<T = any> = import("front-db").Data<T>

//type EasingCls = import("extended-dom").Easing
type EasingCls = import("./app/src/edom").Easing

//type NodeLs<T extends EventTarget = EventTarget> = import("extended-dom").NodeLs<T>
type NodeLs<T extends EventTarget = EventTarget> = import("./app/src/edom").NodeLs<T>



type cssProp = number | string
type cssProps = cssProp[];

interface transformPrimitives {
  rotateX?: cssProp
  rotateY?: cssProp
  rotateZ?: cssProp

  scaleX?: cssProp
  scaleY?: cssProp
  scaleZ?: cssProp

  translateX?: cssProp
  translateY?: cssProp
  translateZ?: cssProp

  skewX?: cssProp
  skewY?: cssProp

  perspective?: cssProp
}

interface transformPrimitivesBaseArray {
  rotateX?: cssProp[]
  rotateY?: cssProp[]
  rotateZ?: cssProp[]

  scaleX?: cssProp[]
  scaleY?: cssProp[]
  scaleZ?: cssProp[]

  translateX?: cssProp[]
  translateY?: cssProp[]
  translateZ?: cssProp[]

  skewX?: cssProp[]
  skewY?: cssProp[]

  perspective?: cssProp[]
}

interface transformUmbrellas {
  rotate?: cssProps
  rotate3d?: cssProps
  scale?: cssProps
  scale3d?: cssProps
  translate?: cssProps
  translate3d?: cssProps
  skew?: cssProps
  matrix?: cssProps
  matrix3d?: cssProps
}

interface transformUmbrellasString {
  rotate?: string
  rotate3d?: string
  scale?: string
  scale3d?: string
  translate?: string
  translate3d?: string
  skew?: string
  matrix?: string
  matrix3d?: string
}

interface transformUmbrellasStringBaseArray {
  rotate?: string[]
  rotate3d?: string[]
  scale?: string[]
  scale3d?: string[]
  translate?: string[]
  translate3d?: string[]
  skew?: string[]
  matrix?: string[]
  matrix3d?: string[]
}



interface UmbrellaCssStyleMap extends transformUmbrellas {
  border?: cssProps;
  borderLeft?: cssProps;
  borderBottom?: cssProps;
  borderRight?: cssProps;
  borderTop?: cssProps;
  margin?: cssProps;
  padding?: cssProps;
}

interface UmbrellaCssStyleMapString extends transformUmbrellasString {
  border?: string;
  borderLeft?: string;
  borderBottom?: string;
  borderRight?: string;
  borderTop?: string;
  margin?: string;
  padding?: string;
}

interface UmbrellaCssStyleMapStringBaseArray extends transformUmbrellasStringBaseArray {
  border?: string[];
  borderLeft?: string[];
  borderBottom?: string[];
  borderRight?: string[];
  borderTop?: string[];
  margin?: string[];
  padding?: string[];
}



interface CSSStyleMap extends transformPrimitives {
  alignContent?: cssProp;
  alignItems?: cssProp;
  alignSelf?: cssProp;
  alignmentBaseline?: cssProp;
  animation?: cssProp;
  animationDelay?: cssProp;
  animationDirection?: cssProp;
  animationDuration?: cssProp;
  animationFillMode?: cssProp;
  animationIterationCount?: cssProp;
  animationName?: cssProp;
  animationPlayState?: cssProp;
  animationTimingFunction?: cssProp;
  backfaceVisibility?: cssProp;
  background?: cssProp;
  backgroundAttachment?: cssProp;
  backgroundClip?: cssProp;
  backgroundColor?: cssProp;
  backgroundImage?: cssProp;
  backgroundOrigin?: cssProp;
  backgroundPosition?: cssProp;
  backgroundPositionX?: cssProp;
  backgroundPositionY?: cssProp;
  backgroundRepeat?: cssProp;
  backgroundSize?: cssProp;
  baselineShift?: cssProp;
  borderBottomColor?: cssProp;
  borderBottomLeftRadius?: cssProp;
  borderBottomRightRadius?: cssProp;
  borderBottomStyle?: cssProp;
  borderBottomWidth?: cssProp;
  borderCollapse?: cssProp;
  borderColor?: cssProp;
  borderImage?: cssProp;
  borderImageOutset?: cssProp;
  borderImageRepeat?: cssProp;
  borderImageSlice?: cssProp;
  borderImageSource?: cssProp;
  borderImageWidth?: cssProp;
  borderLeftColor?: cssProp;
  borderLeftStyle?: cssProp;
  borderLeftWidth?: cssProp;
  borderRadius?: cssProp;
  borderRightColor?: cssProp;
  borderRightStyle?: cssProp;
  borderRightWidth?: cssProp;
  borderSpacing?: cssProp;
  borderStyle?: cssProp;
  borderTopColor?: cssProp;
  borderTopLeftRadius?: cssProp;
  borderTopRightRadius?: cssProp;
  borderTopStyle?: cssProp;
  borderTopWidth?: cssProp;
  borderWidth?: cssProp;
  bottom?: cssProp;
  boxShadow?: cssProp;
  boxSizing?: cssProp;
  breakAfter?: cssProp;
  breakBefore?: cssProp;
  breakInside?: cssProp;
  captionSide?: cssProp;
  clear?: cssProp;
  clip?: cssProp;
  clipPath?: cssProp;
  clipRule?: cssProp;
  color?: cssProp;
  colorInterpolationFilters?: cssProp;
  columnCount?: cssProp;
  columnFill?: cssProp;
  columnGap?: cssProp;
  columnRule?: cssProp;
  columnRuleColor?: cssProp;
  columnRuleStyle?: cssProp;
  columnRuleWidth?: cssProp;
  columnSpan?: cssProp;
  columnWidth?: cssProp;
  columns?: cssProp;
  content?: cssProp;
  counterIncrement?: cssProp;
  counterReset?: cssProp;
  cssFloat?: cssProp;
  cssText?: cssProp;
  cursor?: cssProp;
  direction?: cssProp;
  display?: cssProp;
  dominantBaseline?: cssProp;
  emptyCells?: cssProp;
  enableBackground?: cssProp;
  fill?: cssProp;
  fillOpacity?: cssProp;
  fillRule?: cssProp;
  filter?: cssProp;
  flex?: cssProp;
  flexBasis?: cssProp;
  flexDirection?: cssProp;
  flexFlow?: cssProp;
  flexGrow?: cssProp;
  flexShrink?: cssProp;
  flexWrap?: cssProp;
  floodColor?: cssProp;
  floodOpacity?: cssProp;
  font?: cssProp;
  fontFamily?: cssProp;
  fontFeatureSettings?: cssProp;
  fontSize?: cssProp;
  fontSizeAdjust?: cssProp;
  fontStretch?: cssProp;
  fontStyle?: cssProp;
  fontVariant?: cssProp;
  fontWeight?: cssProp;
  gap?: cssProp;
  glyphOrientationHorizontal?: cssProp;
  glyphOrientationVertical?: cssProp;
  grid?: cssProp;
  gridArea?: cssProp;
  gridAutoColumns?: cssProp;
  gridAutoFlow?: cssProp;
  gridAutoRows?: cssProp;
  gridColumn?: cssProp;
  gridColumnEnd?: cssProp;
  gridColumnGap?: cssProp;
  gridColumnStart?: cssProp;
  gridGap?: cssProp;
  gridRow?: cssProp;
  gridRowEnd?: cssProp;
  gridRowGap?: cssProp;
  gridRowStart?: cssProp;
  gridTemplate?: cssProp;
  gridTemplateAreas?: cssProp;
  gridTemplateColumns?: cssProp;
  gridTemplateRows?: cssProp;
  height?: cssProp;
  imeMode?: cssProp;
  justifyContent?: cssProp;
  justifyItems?: cssProp;
  justifySelf?: cssProp;
  kerning?: cssProp;
  layoutGrid?: cssProp;
  layoutGridChar?: cssProp;
  layoutGridLine?: cssProp;
  layoutGridMode?: cssProp;
  layoutGridType?: cssProp;
  left?: cssProp;
  readonly length?: number;
  letterSpacing?: cssProp;
  lightingColor?: cssProp;
  lineBreak?: cssProp;
  lineHeight?: cssProp;
  listStyle?: cssProp;
  listStyleImage?: cssProp;
  listStylePosition?: cssProp;
  listStyleType?: cssProp;
  marginBottom?: cssProp;
  marginLeft?: cssProp;
  marginRight?: cssProp;
  marginTop?: cssProp;
  marker?: cssProp;
  markerEnd?: cssProp;
  markerMid?: cssProp;
  markerStart?: cssProp;
  mask?: cssProp;
  maskImage?: cssProp;
  maxHeight?: cssProp;
  maxWidth?: cssProp;
  minHeight?: cssProp;
  minWidth?: cssProp;
  msContentZoomChaining?: cssProp;
  msContentZoomLimit?: cssProp;
  msContentZoomLimitMax?: cssProp;
  msContentZoomLimitMin?: cssProp;
  msContentZoomSnap?: cssProp;
  msContentZoomSnapPoints?: cssProp;
  msContentZoomSnapType?: cssProp;
  msContentZooming?: cssProp;
  msFlowFrom?: cssProp;
  msFlowInto?: cssProp;
  msFontFeatureSettings?: cssProp;
  msGridColumn?: cssProp;
  msGridColumnAlign?: cssProp;
  msGridColumnSpan?: cssProp;
  msGridColumns?: cssProp;
  msGridRow?: cssProp;
  msGridRowAlign?: cssProp;
  msGridRowSpan?: cssProp;
  msGridRows?: cssProp;
  msHighContrastAdjust?: cssProp;
  msHyphenateLimitChars?: cssProp;
  msHyphenateLimitLines?: cssProp;
  msHyphenateLimitZone?: cssProp;
  msHyphens?: cssProp;
  msImeAlign?: cssProp;
  msOverflowStyle?: cssProp;
  msScrollChaining?: cssProp;
  msScrollLimit?: cssProp;
  msScrollLimitXMax?: cssProp;
  msScrollLimitXMin?: cssProp;
  msScrollLimitYMax?: cssProp;
  msScrollLimitYMin?: cssProp;
  msScrollRails?: cssProp;
  msScrollSnapPointsX?: cssProp;
  msScrollSnapPointsY?: cssProp;
  msScrollSnapType?: cssProp;
  msScrollSnapX?: cssProp;
  msScrollSnapY?: cssProp;
  msScrollTranslation?: cssProp;
  msTextCombineHorizontal?: cssProp;
  msTextSizeAdjust?: cssProp;
  msTouchAction?: cssProp;
  msTouchSelect?: cssProp;
  msUserSelect?: cssProp;
  msWrapFlow?: cssProp;
  msWrapMargin?: cssProp;
  msWrapThrough?: cssProp;
  objectFit?: cssProp;
  objectPosition?: cssProp;
  opacity?: cssProp;
  order?: cssProp;
  orphans?: cssProp;
  outline?: cssProp;
  outlineColor?: cssProp;
  outlineOffset?: cssProp;
  outlineStyle?: cssProp;
  outlineWidth?: cssProp;
  overflow?: cssProp;
  overflowX?: cssProp;
  overflowY?: cssProp;
  paddingBottom?: cssProp;
  paddingLeft?: cssProp;
  paddingRight?: cssProp;
  paddingTop?: cssProp;
  pageBreakAfter?: cssProp;
  pageBreakBefore?: cssProp;
  pageBreakInside?: cssProp;
  readonly parentRule?: CSSRule;
  penAction?: cssProp;
  perspectiveOrigin?: cssProp;
  pointerEvents?: cssProp;
  position?: cssProp;
  quotes?: cssProp;
  resize?: cssProp;
  right?: cssProp;
  rowGap?: cssProp;
  rubyAlign?: cssProp;
  rubyOverhang?: cssProp;
  rubyPosition?: cssProp;
  stopColor?: cssProp;
  stopOpacity?: cssProp;
  stroke?: cssProp;
  strokeDasharray?: cssProp;
  strokeDashoffset?: cssProp;
  strokeLinecap?: cssProp;
  strokeLinejoin?: cssProp;
  strokeMiterlimit?: cssProp;
  strokeOpacity?: cssProp;
  strokeWidth?: cssProp;
  tableLayout?: cssProp;
  textAlign?: cssProp;
  textAlignLast?: cssProp;
  textAnchor?: cssProp;
  textCombineUpright?: cssProp;
  textDecoration?: cssProp;
  textIndent?: cssProp;
  textJustify?: cssProp;
  textKashida?: cssProp;
  textKashidaSpace?: cssProp;
  textOverflow?: cssProp;
  textShadow?: cssProp;
  textTransform?: cssProp;
  textUnderlinePosition?: cssProp;
  top?: cssProp;
  touchAction?: cssProp;
  transform?: cssProp;
  transformOrigin?: cssProp;
  transformStyle?: cssProp;
  transition?: cssProp;
  transitionDelay?: cssProp;
  transitionDuration?: cssProp;
  transitionProperty?: cssProp;
  transitionTimingFunction?: cssProp;
  unicodeBidi?: cssProp;
  userSelect?: cssProp;
  verticalAlign?: cssProp;
  visibility?: cssProp;
  webkitAlignContent?: cssProp;
  webkitAlignItems?: cssProp;
  webkitAlignSelf?: cssProp;
  webkitAnimation?: cssProp;
  webkitAnimationDelay?: cssProp;
  webkitAnimationDirection?: cssProp;
  webkitAnimationDuration?: cssProp;
  webkitAnimationFillMode?: cssProp;
  webkitAnimationIterationCount?: cssProp;
  webkitAnimationName?: cssProp;
  webkitAnimationPlayState?: cssProp;
  webkitAnimationTimingFunction?: cssProp;
  webkitAppearance?: cssProp;
  webkitBackfaceVisibility?: cssProp;
  webkitBackgroundClip?: cssProp;
  webkitBackgroundOrigin?: cssProp;
  webkitBackgroundSize?: cssProp;
  webkitBorderBottomLeftRadius?: cssProp;
  webkitBorderBottomRightRadius?: cssProp;
  webkitBorderImage?: cssProp;
  webkitBorderRadius?: cssProp;
  webkitBorderTopLeftRadius?: cssProp;
  webkitBorderTopRightRadius?: cssProp;
  webkitBoxAlign?: cssProp;
  webkitBoxDirection?: cssProp;
  webkitBoxFlex?: cssProp;
  webkitBoxOrdinalGroup?: cssProp;
  webkitBoxOrient?: cssProp;
  webkitBoxPack?: cssProp;
  webkitBoxSizing?: cssProp;
  webkitColumnBreakAfter?: cssProp;
  webkitColumnBreakBefore?: cssProp;
  webkitColumnBreakInside?: cssProp;
  webkitColumnCount?: cssProp;
  webkitColumnGap?: cssProp;
  webkitColumnRule?: cssProp;
  webkitColumnRuleColor?: cssProp;
  webkitColumnRuleStyle?: cssProp;
  webkitColumnRuleWidth?: cssProp;
  webkitColumnSpan?: cssProp;
  webkitColumnWidth?: cssProp;
  webkitColumns?: cssProp;
  webkitFilter?: cssProp;
  webkitFlex?: cssProp;
  webkitFlexBasis?: cssProp;
  webkitFlexDirection?: cssProp;
  webkitFlexFlow?: cssProp;
  webkitFlexGrow?: cssProp;
  webkitFlexShrink?: cssProp;
  webkitFlexWrap?: cssProp;
  webkitJustifyContent?: cssProp;
  webkitOrder?: cssProp;
  webkitPerspective?: cssProp;
  webkitPerspectiveOrigin?: cssProp;
  webkitTapHighlightColor?: cssProp;
  webkitTextFillColor?: cssProp;
  webkitTextSizeAdjust?: cssProp;
  webkitTextStroke?: cssProp;
  webkitTextStrokeColor?: cssProp;
  webkitTextStrokeWidth?: cssProp;
  webkitTransform?: cssProp;
  webkitTransformOrigin?: cssProp;
  webkitTransformStyle?: cssProp;
  webkitTransition?: cssProp;
  webkitTransitionDelay?: cssProp;
  webkitTransitionDuration?: cssProp;
  webkitTransitionProperty?: cssProp;
  webkitTransitionTimingFunction?: cssProp;
  webkitUserModify?: cssProp;
  webkitUserSelect?: cssProp;
  webkitWritingMode?: cssProp;
  whiteSpace?: cssProp;
  widows?: cssProp;
  width?: cssProp;
  wordBreak?: cssProp;
  wordSpacing?: cssProp;
  wordWrap?: any;
  writingMode?: cssProp;
  zIndex?: cssProp;
  zoom?: cssProp;
}

interface FullCSSStyleMap extends CSSStyleMap, UmbrellaCssStyleMap {

}


interface CSSStyleMapBaseArray extends transformPrimitivesBaseArray {
  alignContent?: cssProp[];
  alignItems?: cssProp[];
  alignSelf?: cssProp[];
  alignmentBaseline?: cssProp[];
  animation?: cssProp[];
  animationDelay?: cssProp[];
  animationDirection?: cssProp[];
  animationDuration?: cssProp[];
  animationFillMode?: cssProp[];
  animationIterationCount?: cssProp[];
  animationName?: cssProp[];
  animationPlayState?: cssProp[];
  animationTimingFunction?: cssProp[];
  backfaceVisibility?: cssProp[];
  background?: cssProp[];
  backgroundAttachment?: cssProp[];
  backgroundClip?: cssProp[];
  backgroundColor?: cssProp[];
  backgroundImage?: cssProp[];
  backgroundOrigin?: cssProp[];
  backgroundPosition?: cssProp[];
  backgroundPositionX?: cssProp[];
  backgroundPositionY?: cssProp[];
  backgroundRepeat?: cssProp[];
  backgroundSize?: cssProp[];
  baselineShift?: cssProp[];
  borderBottomColor?: cssProp[];
  borderBottomLeftRadius?: cssProp[];
  borderBottomRightRadius?: cssProp[];
  borderBottomStyle?: cssProp[];
  borderBottomWidth?: cssProp[];
  borderCollapse?: cssProp[];
  borderColor?: cssProp[];
  borderImage?: cssProp[];
  borderImageOutset?: cssProp[];
  borderImageRepeat?: cssProp[];
  borderImageSlice?: cssProp[];
  borderImageSource?: cssProp[];
  borderImageWidth?: cssProp[];
  borderLeftColor?: cssProp[];
  borderLeftStyle?: cssProp[];
  borderLeftWidth?: cssProp[];
  borderRadius?: cssProp[];
  borderRightColor?: cssProp[];
  borderRightStyle?: cssProp[];
  borderRightWidth?: cssProp[];
  borderSpacing?: cssProp[];
  borderStyle?: cssProp[];
  borderTopColor?: cssProp[];
  borderTopLeftRadius?: cssProp[];
  borderTopRightRadius?: cssProp[];
  borderTopStyle?: cssProp[];
  borderTopWidth?: cssProp[];
  borderWidth?: cssProp[];
  bottom?: cssProp[];
  boxShadow?: cssProp[];
  boxSizing?: cssProp[];
  breakAfter?: cssProp[];
  breakBefore?: cssProp[];
  breakInside?: cssProp[];
  captionSide?: cssProp[];
  clear?: cssProp[];
  clip?: cssProp[];
  clipPath?: cssProp[];
  clipRule?: cssProp[];
  color?: cssProp[];
  colorInterpolationFilters?: cssProp[];
  columnCount?: cssProp[];
  columnFill?: cssProp[];
  columnGap?: cssProp[];
  columnRule?: cssProp[];
  columnRuleColor?: cssProp[];
  columnRuleStyle?: cssProp[];
  columnRuleWidth?: cssProp[];
  columnSpan?: cssProp[];
  columnWidth?: cssProp[];
  columns?: cssProp[];
  content?: cssProp[];
  counterIncrement?: cssProp[];
  counterReset?: cssProp[];
  cssFloat?: cssProp[];
  cssText?: cssProp[];
  cursor?: cssProp[];
  direction?: cssProp[];
  display?: cssProp[];
  dominantBaseline?: cssProp[];
  emptyCells?: cssProp[];
  enableBackground?: cssProp[];
  fill?: cssProp[];
  fillOpacity?: cssProp[];
  fillRule?: cssProp[];
  filter?: cssProp[];
  flex?: cssProp[];
  flexBasis?: cssProp[];
  flexDirection?: cssProp[];
  flexFlow?: cssProp[];
  flexGrow?: cssProp[];
  flexShrink?: cssProp[];
  flexWrap?: cssProp[];
  floodColor?: cssProp[];
  floodOpacity?: cssProp[];
  font?: cssProp[];
  fontFamily?: cssProp[];
  fontFeatureSettings?: cssProp[];
  fontSize?: cssProp[];
  fontSizeAdjust?: cssProp[];
  fontStretch?: cssProp[];
  fontStyle?: cssProp[];
  fontVariant?: cssProp[];
  fontWeight?: cssProp[];
  gap?: cssProp[];
  glyphOrientationHorizontal?: cssProp[];
  glyphOrientationVertical?: cssProp[];
  grid?: cssProp[];
  gridArea?: cssProp[];
  gridAutoColumns?: cssProp[];
  gridAutoFlow?: cssProp[];
  gridAutoRows?: cssProp[];
  gridColumn?: cssProp[];
  gridColumnEnd?: cssProp[];
  gridColumnGap?: cssProp[];
  gridColumnStart?: cssProp[];
  gridGap?: cssProp[];
  gridRow?: cssProp[];
  gridRowEnd?: cssProp[];
  gridRowGap?: cssProp[];
  gridRowStart?: cssProp[];
  gridTemplate?: cssProp[];
  gridTemplateAreas?: cssProp[];
  gridTemplateColumns?: cssProp[];
  gridTemplateRows?: cssProp[];
  height?: cssProp[];
  imeMode?: cssProp[];
  justifyContent?: cssProp[];
  justifyItems?: cssProp[];
  justifySelf?: cssProp[];
  kerning?: cssProp[];
  layoutGrid?: cssProp[];
  layoutGridChar?: cssProp[];
  layoutGridLine?: cssProp[];
  layoutGridMode?: cssProp[];
  layoutGridType?: cssProp[];
  left?: cssProp[];
  readonly length?: number[];
  letterSpacing?: cssProp[];
  lightingColor?: cssProp[];
  lineBreak?: cssProp[];
  lineHeight?: cssProp[];
  listStyle?: cssProp[];
  listStyleImage?: cssProp[];
  listStylePosition?: cssProp[];
  listStyleType?: cssProp[];
  marginBottom?: cssProp[];
  marginLeft?: cssProp[];
  marginRight?: cssProp[];
  marginTop?: cssProp[];
  marker?: cssProp[];
  markerEnd?: cssProp[];
  markerMid?: cssProp[];
  markerStart?: cssProp[];
  mask?: cssProp[];
  maskImage?: cssProp[];
  maxHeight?: cssProp[];
  maxWidth?: cssProp[];
  minHeight?: cssProp[];
  minWidth?: cssProp[];
  msContentZoomChaining?: cssProp[];
  msContentZoomLimit?: cssProp[];
  msContentZoomLimitMax?: cssProp[];
  msContentZoomLimitMin?: cssProp[];
  msContentZoomSnap?: cssProp[];
  msContentZoomSnapPoints?: cssProp[];
  msContentZoomSnapType?: cssProp[];
  msContentZooming?: cssProp[];
  msFlowFrom?: cssProp[];
  msFlowInto?: cssProp[];
  msFontFeatureSettings?: cssProp[];
  msGridColumn?: cssProp[];
  msGridColumnAlign?: cssProp[];
  msGridColumnSpan?: cssProp[];
  msGridColumns?: cssProp[];
  msGridRow?: cssProp[];
  msGridRowAlign?: cssProp[];
  msGridRowSpan?: cssProp[];
  msGridRows?: cssProp[];
  msHighContrastAdjust?: cssProp[];
  msHyphenateLimitChars?: cssProp[];
  msHyphenateLimitLines?: cssProp[];
  msHyphenateLimitZone?: cssProp[];
  msHyphens?: cssProp[];
  msImeAlign?: cssProp[];
  msOverflowStyle?: cssProp[];
  msScrollChaining?: cssProp[];
  msScrollLimit?: cssProp[];
  msScrollLimitXMax?: cssProp[];
  msScrollLimitXMin?: cssProp[];
  msScrollLimitYMax?: cssProp[];
  msScrollLimitYMin?: cssProp[];
  msScrollRails?: cssProp[];
  msScrollSnapPointsX?: cssProp[];
  msScrollSnapPointsY?: cssProp[];
  msScrollSnapType?: cssProp[];
  msScrollSnapX?: cssProp[];
  msScrollSnapY?: cssProp[];
  msScrollTranslation?: cssProp[];
  msTextCombineHorizontal?: cssProp[];
  msTextSizeAdjust?: cssProp[];
  msTouchAction?: cssProp[];
  msTouchSelect?: cssProp[];
  msUserSelect?: cssProp[];
  msWrapFlow?: cssProp[];
  msWrapMargin?: cssProp[];
  msWrapThrough?: cssProp[];
  objectFit?: cssProp[];
  objectPosition?: cssProp[];
  opacity?: cssProp[];
  order?: cssProp[];
  orphans?: cssProp[];
  outline?: cssProp[];
  outlineColor?: cssProp[];
  outlineOffset?: cssProp[];
  outlineStyle?: cssProp[];
  outlineWidth?: cssProp[];
  overflow?: cssProp[];
  overflowX?: cssProp[];
  overflowY?: cssProp[];
  paddingBottom?: cssProp[];
  paddingLeft?: cssProp[];
  paddingRight?: cssProp[];
  paddingTop?: cssProp[];
  pageBreakAfter?: cssProp[];
  pageBreakBefore?: cssProp[];
  pageBreakInside?: cssProp[];
  readonly parentRule?: CSSRule[];
  penAction?: cssProp[];
  perspectiveOrigin?: cssProp[];
  pointerEvents?: cssProp[];
  position?: cssProp[];
  quotes?: cssProp[];
  resize?: cssProp[];
  right?: cssProp[];
  rowGap?: cssProp[];
  rubyAlign?: cssProp[];
  rubyOverhang?: cssProp[];
  rubyPosition?: cssProp[];
  stopColor?: cssProp[];
  stopOpacity?: cssProp[];
  stroke?: cssProp[];
  strokeDasharray?: cssProp[];
  strokeDashoffset?: cssProp[];
  strokeLinecap?: cssProp[];
  strokeLinejoin?: cssProp[];
  strokeMiterlimit?: cssProp[];
  strokeOpacity?: cssProp[];
  strokeWidth?: cssProp[];
  tableLayout?: cssProp[];
  textAlign?: cssProp[];
  textAlignLast?: cssProp[];
  textAnchor?: cssProp[];
  textCombineUpright?: cssProp[];
  textDecoration?: cssProp[];
  textIndent?: cssProp[];
  textJustify?: cssProp[];
  textKashida?: cssProp[];
  textKashidaSpace?: cssProp[];
  textOverflow?: cssProp[];
  textShadow?: cssProp[];
  textTransform?: cssProp[];
  textUnderlinePosition?: cssProp[];
  top?: cssProp[];
  touchAction?: cssProp[];
  transform?: cssProp[];
  transformOrigin?: cssProp[];
  transformStyle?: cssProp[];
  transition?: cssProp[];
  transitionDelay?: cssProp[];
  transitionDuration?: cssProp[];
  transitionProperty?: cssProp[];
  transitionTimingFunction?: cssProp[];
  unicodeBidi?: cssProp[];
  userSelect?: cssProp[];
  verticalAlign?: cssProp[];
  visibility?: cssProp[];
  webkitAlignContent?: cssProp[];
  webkitAlignItems?: cssProp[];
  webkitAlignSelf?: cssProp[];
  webkitAnimation?: cssProp[];
  webkitAnimationDelay?: cssProp[];
  webkitAnimationDirection?: cssProp[];
  webkitAnimationDuration?: cssProp[];
  webkitAnimationFillMode?: cssProp[];
  webkitAnimationIterationCount?: cssProp[];
  webkitAnimationName?: cssProp[];
  webkitAnimationPlayState?: cssProp[];
  webkitAnimationTimingFunction?: cssProp[];
  webkitAppearance?: cssProp[];
  webkitBackfaceVisibility?: cssProp[];
  webkitBackgroundClip?: cssProp[];
  webkitBackgroundOrigin?: cssProp[];
  webkitBackgroundSize?: cssProp[];
  webkitBorderBottomLeftRadius?: cssProp[];
  webkitBorderBottomRightRadius?: cssProp[];
  webkitBorderImage?: cssProp[];
  webkitBorderRadius?: cssProp[];
  webkitBorderTopLeftRadius?: cssProp[];
  webkitBorderTopRightRadius?: cssProp[];
  webkitBoxAlign?: cssProp[];
  webkitBoxDirection?: cssProp[];
  webkitBoxFlex?: cssProp[];
  webkitBoxOrdinalGroup?: cssProp[];
  webkitBoxOrient?: cssProp[];
  webkitBoxPack?: cssProp[];
  webkitBoxSizing?: cssProp[];
  webkitColumnBreakAfter?: cssProp[];
  webkitColumnBreakBefore?: cssProp[];
  webkitColumnBreakInside?: cssProp[];
  webkitColumnCount?: cssProp[];
  webkitColumnGap?: cssProp[];
  webkitColumnRule?: cssProp[];
  webkitColumnRuleColor?: cssProp[];
  webkitColumnRuleStyle?: cssProp[];
  webkitColumnRuleWidth?: cssProp[];
  webkitColumnSpan?: cssProp[];
  webkitColumnWidth?: cssProp[];
  webkitColumns?: cssProp[];
  webkitFilter?: cssProp[];
  webkitFlex?: cssProp[];
  webkitFlexBasis?: cssProp[];
  webkitFlexDirection?: cssProp[];
  webkitFlexFlow?: cssProp[];
  webkitFlexGrow?: cssProp[];
  webkitFlexShrink?: cssProp[];
  webkitFlexWrap?: cssProp[];
  webkitJustifyContent?: cssProp[];
  webkitOrder?: cssProp[];
  webkitPerspective?: cssProp[];
  webkitPerspectiveOrigin?: cssProp[];
  webkitTapHighlightColor?: cssProp[];
  webkitTextFillColor?: cssProp[];
  webkitTextSizeAdjust?: cssProp[];
  webkitTextStroke?: cssProp[];
  webkitTextStrokeColor?: cssProp[];
  webkitTextStrokeWidth?: cssProp[];
  webkitTransform?: cssProp[];
  webkitTransformOrigin?: cssProp[];
  webkitTransformStyle?: cssProp[];
  webkitTransition?: cssProp[];
  webkitTransitionDelay?: cssProp[];
  webkitTransitionDuration?: cssProp[];
  webkitTransitionProperty?: cssProp[];
  webkitTransitionTimingFunction?: cssProp[];
  webkitUserModify?: cssProp[];
  webkitUserSelect?: cssProp[];
  webkitWritingMode?: cssProp[];
  whiteSpace?: cssProp[];
  widows?: cssProp[];
  width?: cssProp[];
  wordBreak?: cssProp[];
  wordSpacing?: cssProp[];
  wordWrap?: any[];
  writingMode?: cssProp[];
  zIndex?: cssProp[];
  zoom?: cssProp[];
}


interface AnimationCSSStyleMapBaseArray extends CSSStyleMapBaseArray, UmbrellaCssStyleMapStringBaseArray {
	
}

interface AnimationCSSStyleMap extends CSSStyleMap, UmbrellaCssStyleMapString {
	offset?: number
}



interface CssFunction {
	<T extends keyof FullCSSStyleMap>(key: T, preventAutoParsing: false): string;
	<T extends keyof FullCSSStyleMap>(key: T, preventAutoParsing: true): number;
	<T extends keyof FullCSSStyleMap>(key: T, preventAutoParsing?: boolean): any;
	<T extends keyof FullCSSStyleMap>(key: T, val: FullCSSStyleMap[T]): this;
	(css: FullCSSStyleMap): this;
}

interface DragEvent {
	setData(data: any): void;
	getData(): void;
}

type easingKeyWordCamelCase = "linear" | "ease" | "easeIn" | "easeOut" | "easeInOut"
type easingKeyWordDashCase  = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
type easingKeyWord = easingKeyWordCamelCase | easingKeyWordDashCase

//TODO finish types
interface AnimationOptions  {
	//default inc number
	readonly name?: string;
	//default ease / easeInOut
	readonly easing?: EasingBind | easingKeyWord
}

interface UnguidedAnimationOptions extends AnimationOptions {
	//default 200
	readonly duration?: number
	//default 1
	readonly iterations?: number
	//default true
	readonly fill?: boolean
}

interface GuidedAnimationOptions extends AnimationOptions {
  //default 0
	start?: number
	//default start + 100
	end?: number
	//default false | true
	readonly smooth?: boolean
	//default N/A
	outCb?: (() => void) | string
	//default N/A
	inCb?: (() => void) | string
	//default true
	readonly active?: Data<boolean>;
}


interface DragEvent {
	getData(): any;
	setData(data: any): void;
}


interface EventTarget {
  listener<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;
	listen<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;
  ls<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;
  
  /**
	 * addEventListener alias
 	 */
	on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: Element, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
	/**
	 * removeEventListener alias
	 * TODO: corect types
 	 */
	off<K extends keyof HTMLElementEventMap>(type: K, listener: (this: Element, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
	/**
	 * JQuery like implementation
 	 */
  css: CssFunction;
  
  /**
	 * Appends given elems
 	 */
	apd(...elems: (Element | string)[]): this;
	/**
	 * Empties the node so that no elements are inside
 	 */
	emptyNodes(): this;
	/**
	 * Hides elem
 	 */
	hide(): this;
	/**
	 * Shows elem
 	 */
	show(): this;
	/**
	 * Gets children matching given css-selector or all as deep as depth is
	 * @param selector css-selector filter of depth how far down all children shall be collected as number (defaults to 1)
 	 */
	childs(selector?: string | number): NodeLs<Element>;
	/**
	 * Computed height of elem
 	 */
	height: number;
	/**
	 * Computed width of elem
 	 */
	width: number;
	/**
	 * offset of elem (relative to the parent)
 	 */
	readonly offset: {width: number, height: number, top: number, left: number};
	/**
	 * absulute offset of elem (relative to the chrome)
	 * wont work with floating elements
	 */
	readonly absoluteOffset: {width: number, height: number, top: number, bottom: number, left: number, right: number, x: number, y: number}
	/**
	 * Width including padding and border
 	 */
	readonly outerWidth: number;
	/**
	 * Height including padding and border
 	 */
	readonly outerHeight: number;
	/**
	 * Width including padding
 	 */
	readonly innerWidth: number;
	/**
	 * Height including padding
 	 */
	readonly innerHeight: number;
	/**
	 * ParentNode node
 	 */
	readonly parent: this;
	/**
	 * alias for innerHTML
 	 */
	html: string;			//just string acceped since just string gets returned
	inner: string | number | boolean | Element | Array<Element | boolean | string | number>;
}


interface Element {
  polyAnimate: any


	readonly eventListener: Function[];
	anim(frame_frames: AnimationCSSStyleMap | AnimationCSSStyleMap[] | AnimationCSSStyleMapBaseArray, options?: UnguidedAnimationOptions): Promise<void>;
	anim(frame_frames: AnimationCSSStyleMap | AnimationCSSStyleMap[] | AnimationCSSStyleMapBaseArray, options: GuidedAnimationOptions, guidance: Data<number>): Promise<void>;


	listener<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;
	listen<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;
	ls<K extends keyof HTMLElementEventMap>(event: K, listener?: (this: Element, ev: HTMLElementEventMap[K]) => any, patch?: boolean): any;

	insertAfter(newNode: Element, referenceNode: Element): this;

	/**
	 * addEventListener alias
 	 */
	on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: Element, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): this;
	/**
	 * removeEventListener alias
	 * TODO: corect types
 	 */
	off<K extends keyof HTMLElementEventMap>(type: K, listener: (this: Element, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): this;
	/**
	 * JQuery like implementation
 	 */
	css: CssFunction;
	/**
	 * Adds cssClass
 	 */
	addClass(...className: string[]): this;
	/**
	 * Removes cssClass
 	 */
	removeClass(...className: string[]): this;
	//JQuerylike
	hasClass(...classNames: string[]): boolean;
	//JQuerylike
	toggleClass(...classNames: string[]): this;

	/**
	 * Appends given elems
 	 */
	apd(...elems: (Element | string)[]): this;
	/**
	 * Empties the node so that no elements are inside
 	 */
	emptyNodes(): this;
	/**
	 * Hides elem
 	 */
	hide(): this;
	/**
	 * Shows elem
 	 */
	show(): this;
	/**
	 * Gets children matching given css-selector or all as deep as depth is
	 * @param selector css-selector filter of depth how far down all children shall be collected as number (defaults to 1)
 	 */
	childs(selector?: string | number): NodeLs<any>;
	/**
	 * Computed height of elem
 	 */
	height: number;
	/**
	 * Computed width of elem
 	 */
	width: number;
	/**
	 * offset of elem (relative to the parent)
 	 */
	readonly offset: {width: number, height: number, top: number, left: number};
	/**
	 * absulute offset of elem (relative to the chrome)
	 * wont work with floating elements
	 */
	readonly absoluteOffset: {width: number, height: number, top: number, bottom: number, left: number, right: number, x: number, y: number}
	/**
	 * Width including padding and border
 	 */
	readonly outerWidth: number;
	/**
	 * Height including padding and border
 	 */
	readonly outerHeight: number;
	/**
	 * Width including padding
 	 */
	readonly innerWidth: number;
	/**
	 * Height including padding
 	 */
	readonly innerHeight: number;
	/**
	 * ParentNode node
 	 */
	readonly parent: this;
	/**
	 * alias for innerHTML
 	 */
	html: string;			//just string acceped since just string gets returned
	inner: string | number | boolean | Element | Array<Element | boolean | string | number>;
}


// -------- edom end

//------------- XRRAY start

interface Array<T> {
	/**
	 * True if empty
	 */
	readonly empty: boolean;
	/**
	 * Last element
	 */
	readonly last: T;
	/**
	 * First element
	 */
	readonly first: T;
	/**
	 * length without empty slots
	 */
	readonly realLength: number;
	/**
	 * Clears the array of all elements
	 */
	clear(): this;
	/**
	 * Clears the array of all elements
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clear(): this;
	/**
	 * Adds values to the array
	 */
	add(...value: T[]): this;
	/**
	 * Adds values to the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Add(...value: T[]): this;
	/**
	 * Sets the array to the given one without chnaging the refernece
	 */
	set(array: T[] | T[]): this;
	/**
	 * Sets the array to the given one without chnaging the refernece
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Set(array: T[] | T[]): this;
	/**
	 * Iterates over all own properties
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	ea<R>(loop: (e?: T, i?: number, array?: this) => R, thisArg?: any): R;
	/**
	 * Iterates over all own properties
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	each<R>(loop: (e?: T, i?: number, array?: this) => R, thisArg?: any): R;
	/**
	 * Reverts the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Reverse(): this;
	/**
	 * Gets all indexes that match the given values
	 */
	index(...values: T[]): number[];
	/**
	 * Cleans the array of all nulls and undefineds
	 */
	clean(): this;
	/**
	 * clones
	 */
	clone(): T[];
	/**
	 * Cleans the array of all nulls and undefineds
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clean(): this;
	/**
	 * Removes given indexes
	 */
	removeI(...index: number[]): this;
	/**
	 * Removes given indexes
	 */
	rmI(...index: number[]): this;
	/**
	 * Removes given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveI(...index: number[]): this;
	/**
	 * Removes given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RmI(...index: number[]): this;
	/**
	 * Removes given values
	 */
	removeV(...value: T[]): this;
	/**
	 * Removes given values
	 */
	rmV(...value: T[]): this;
	/**
	 * Removes given values
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveV(...value: T[]): this;
	/**
	 * Removes given values
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RmV(...value: T[]): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	remove(...valueOrIndex: T[] | number[]): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	rm(...valueOrIndex: T[] | number[]): this;
	/**
	 * Removes given values / indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Remove(...valueOrIndex: T[] | number[]): this;
	/**
	 * Removes given values / indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Rm(...valueOrIndex: T[] | number[]): this;
	/**
	 * Sets the array to given indexes
	 */
	get(...index: number[]): this;
	/**
	 * Sets the array to given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Get(...index: number[]): this;
	/**
	 * Adds given values to the end of the array
	 */
	dda(...value: T[]): this;
	/**
	 * Adds given values to the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Dda(...value: T[]): this;
	/**
	 * Removes given number of elements from the end of the array
	 */
	rem(amount: number): this;
	/**
	 * Removes given number of elements from the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Rem(amount: number): this;
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	mer(amount: number): this;
	/**
	 * Removes given number of elements from the begin of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Mer(amount: number): this;
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 */
	swapI(i1: number, i2: number): this;
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapI(i1: number | number[], i2: number | number[]): this;
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 */
	swapV(v1: T | T[], v2: T | T[]): this;
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapV(v1: T | T[], v2: T | T[]): this;
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 */
	swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): this;
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): this;
	/**
	 * Like default flat
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Flat(ammount?: number): this
	 /**
 	 * Add elements a to array but only if they are not already present
 	 */
 	gather(...a: T[]): this;
 	/**
 	 * Add elements a to array but only if they are not already present
 	 * The inital array stays unchanged; a new one gets inited;
 	 */
 	Gather(...a: T[]): T[];
	/**
	 * Gets the element prior of that given as index
	 * If the prior index would be -1 the last one is returned
	 */
	prior(index: number, by?: number): T;
	/**
	 * Gets the element next of that given as index
	 * If the next index would be length the first one is returned
	 */
	 next(index: number, by?: number): T;
	 /**
 	 * Inject item at index
 	 */
   inject(item: T, index: number): this
   /**
	 * True if all given vals are included within this
	 */
  contains(...vals: T[]): boolean
  /**
	 * True if non of the given vals are included within this
	 */
	excludes(...vals: T[]): boolean

	/**
	 * Finds the closest element of an numeric array to given to
	 */
	closest: T extends number ? (to: number) => number : typeof undefined
	/**
	 * Finds the closest element of an numeric array to given to
	 */
	nearest: T extends number ? (to: number) => number : typeof undefined
}

interface IndexOutOfBoundsException extends Exception {
	index: number;
	array: any[];
}

interface InvalidInputException extends Exception {

}

interface InvalidConstructorException extends Exception {

}

interface InvalidValueException extends Exception {
	value: any;
	array: any[];
}

interface Exception extends Error {
	message: string;
}

//------------- XRRAY end
