import {
    AnimationEventHandler,
    ClipboardEventHandler,
    CompositionEventHandler,
    DragEventHandler,
    FocusEventHandler,
    FormEventHandler, KeyboardEventHandler, MouseEventHandler, PointerEventHandler,
    ReactEventHandler, TouchEventHandler, TransitionEventHandler, UIEventHandler, WheelEventHandler
} from "react";
import {Property} from "csstype";
import RTBase from "./RTBase";

function RTStyleProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        (this as RTStyle).setStyle(propertyKey, args[0], args[1])
        return originalValue.apply(this, args);
    }
}

function ElementViewProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        (this as RTStyle).setProp(propertyKey, args[0], args[1])
        return originalValue.apply(this, args);
    }
}

export default class RTStyle<TLength = (string & {}) | 0, TTime = string & {}> extends RTBase {
    IAmRTWithStyle = true

    // ---* Events from react/RTHH.d.tx -> DOMAttributes
    // ---- Clipboard Events
    @ElementViewProp
    onCopy(value: ClipboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCopyCapture(value: ClipboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCut(value: ClipboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCutCapture(value: ClipboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPaste(value: ClipboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPasteCapture(value: ClipboardEventHandler, willSet=true) { return this }

    // ---- Composition Events
    @ElementViewProp
    onCompositionEnd(value: CompositionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCompositionEndCapture(value: CompositionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCompositionStart(value: CompositionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCompositionStartCapture(value: CompositionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCompositionUpdate(value: CompositionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCompositionUpdateCapture(value: CompositionEventHandler, willSet=true) { return this }

    // ---- Focus Events
    @ElementViewProp
    onFocus(value: FocusEventHandler, willSet=true) { return this }

    @ElementViewProp
    onFocusCapture(value: FocusEventHandler, willSet=true) { return this }

    @ElementViewProp
    onBlur(value: FocusEventHandler, willSet=true) { return this }

    @ElementViewProp
    onBlurCapture(value: FocusEventHandler, willSet=true) { return this }

    // ---- Form Events
    @ElementViewProp
    onChange(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onChangeCapture(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onBeforeInput(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onBeforeInputCapture(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onInput(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onInputCapture(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onReset(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onResetCapture(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSubmit(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSubmitCapture(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onInvalid(value: FormEventHandler, willSet=true) { return this }

    @ElementViewProp
    onInvalidCapture(value: FormEventHandler, willSet=true) { return this }

    // ---- Image Events
    @ElementViewProp
    onLoad(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onError(value: ReactEventHandler, willSet=true) { return this }

    // ---- also a Media Event
    @ElementViewProp
    onErrorCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- also a Media Event
    // ---- Keyboard Events
    @ElementViewProp
    onKeyDown(value: KeyboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onKeyDownCapture(value: KeyboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onKeyPress(value: KeyboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onKeyPressCapture(value: KeyboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onKeyUp(value: KeyboardEventHandler, willSet=true) { return this }

    @ElementViewProp
    onKeyUpCapture(value: KeyboardEventHandler, willSet=true) { return this }

    // ---- Media Events
    @ElementViewProp
    onAbort(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAbortCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCanPlay(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCanPlayCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCanPlayThrough(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onCanPlayThroughCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDurationChange(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDurationChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEmptied(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEmptiedCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEncrypted(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEncryptedCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEnded(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onEndedCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadedData(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadedDataCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadedMetadata(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadedMetadataCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadStart(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLoadStartCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPause(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPauseCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPlay(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPlayCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPlaying(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPlayingCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onProgress(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onProgressCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onRateChange(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onRateChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSeeked(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSeekedCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSeeking(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSeekingCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onStalled(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onStalledCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSuspend(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSuspendCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTimeUpdate(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTimeUpdateCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onVolumeChange(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onVolumeChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onWaiting(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onWaitingCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- MouseEvents
    @ElementViewProp
    onAuxClick(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAuxClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onClick(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onContextMenu(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onContextMenuCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDoubleClick(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDoubleClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDrag(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragEnd(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragEndCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragEnter(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragEnterCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragExit(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragExitCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragLeave(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragLeaveCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragOver(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragOverCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragStart(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDragStartCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDrop(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onDropCapture(value: DragEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseDown(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseDownCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseEnter(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseLeave(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseMove(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseMoveCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseOut(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseOutCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseOver(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseOverCapture(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseUp(value: MouseEventHandler, willSet=true) { return this }

    @ElementViewProp
    onMouseUpCapture(value: MouseEventHandler, willSet=true) { return this }

    // ---- Selection Events
    @ElementViewProp
    onSelect(value: ReactEventHandler, willSet=true) { return this }

    @ElementViewProp
    onSelectCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- Touch Events
    @ElementViewProp
    onTouchCancel(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchCancelCapture(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchEnd(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchEndCapture(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchMove(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchMoveCapture(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchStart(value: TouchEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTouchStartCapture(value: TouchEventHandler, willSet=true) { return this }

    // ---- Pointer Events
    @ElementViewProp
    onPointerDown(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerDownCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerMove(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerMoveCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerUp(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerUpCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerCancel(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerCancelCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerEnter(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerEnterCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerLeave(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerLeaveCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerOver(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerOverCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerOut(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onPointerOutCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onGotPointerCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onGotPointerCaptureCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLostPointerCapture(value: PointerEventHandler, willSet=true) { return this }

    @ElementViewProp
    onLostPointerCaptureCapture(value: PointerEventHandler, willSet=true) { return this }

    // ---- UI Events
    @ElementViewProp
    onScroll(value: UIEventHandler, willSet=true) { return this }

    @ElementViewProp
    onScrollCapture(value: UIEventHandler, willSet=true) { return this }

    // ---- Wheel Events
    @ElementViewProp
    onWheel(value: WheelEventHandler, willSet=true) { return this }

    @ElementViewProp
    onWheelCapture(value: WheelEventHandler, willSet=true) { return this }

    // ---- Animation Events
    @ElementViewProp
    onAnimationStart(value: AnimationEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAnimationStartCapture(value: AnimationEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAnimationEnd(value: AnimationEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAnimationEndCapture(value: AnimationEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAnimationIteration(value: AnimationEventHandler, willSet=true) { return this }

    @ElementViewProp
    onAnimationIterationCapture(value: AnimationEventHandler, willSet=true) { return this }

    // ---- Transition Events
    @ElementViewProp
    onTransitionEnd(value: TransitionEventHandler, willSet=true) { return this }

    @ElementViewProp
    onTransitionEndCapture(value: TransitionEventHandler, willSet=true) { return this }

    // ---* All styles from csstype/RTHH.d.ts
    @RTStyleProp
    accentColor(value: Property.AccentColor, willSet=true) { return this }

    @RTStyleProp
    alignContent(value: Property.AlignContent, willSet=true) { return this }

    @RTStyleProp
    alignItems(value: Property.AlignItems, willSet=true) { return this }

    @RTStyleProp
    alignSelf(value: Property.AlignSelf, willSet=true) { return this }

    @RTStyleProp
    alignTracks(value: Property.AlignTracks, willSet=true) { return this }

    @RTStyleProp
    animationDelay(value: Property.AnimationDelay<TTime>, willSet=true) { return this }

    @RTStyleProp
    animationDirection(value: Property.AnimationDirection, willSet=true) { return this }

    @RTStyleProp
    animationDuration(value: Property.AnimationDuration<TTime>, willSet=true) { return this }

    @RTStyleProp
    animationFillMode(value: Property.AnimationFillMode, willSet=true) { return this }

    @RTStyleProp
    animationIterationCount(value: Property.AnimationIterationCount, willSet=true) { return this }

    @RTStyleProp
    animationName(value: Property.AnimationName, willSet=true) { return this }

    @RTStyleProp
    animationPlayState(value: Property.AnimationPlayState, willSet=true) { return this }

    @RTStyleProp
    animationTimeline(value: Property.AnimationTimeline, willSet=true) { return this }

    @RTStyleProp
    animationTimingFunction(value: Property.AnimationTimingFunction, willSet=true) { return this }

    @RTStyleProp
    appearance(value: Property.Appearance, willSet=true) { return this }

    @RTStyleProp
    aspectRatio(value: Property.AspectRatio, willSet=true) { return this }

    @RTStyleProp
    backdropFilter(value: Property.BackdropFilter, willSet=true) { return this }

    @RTStyleProp
    backfaceVisibility(value: Property.BackfaceVisibility, willSet=true) { return this }

    @RTStyleProp
    backgroundAttachment(value: Property.BackgroundAttachment, willSet=true) { return this }

    @RTStyleProp
    backgroundBlendMode(value: Property.BackgroundBlendMode, willSet=true) { return this }

    @RTStyleProp
    backgroundClip(value: Property.BackgroundClip, willSet=true) { return this }

    @RTStyleProp
    backgroundColor(value: Property.BackgroundColor, willSet=true) { return this }

    @RTStyleProp
    backgroundImage(value: Property.BackgroundImage, willSet=true) { return this }

    @RTStyleProp
    backgroundOrigin(value: Property.BackgroundOrigin, willSet=true) { return this }

    @RTStyleProp
    backgroundPositionX(value: Property.BackgroundPositionX<TLength>, willSet=true) { return this }

    @RTStyleProp
    backgroundPositionY(value: Property.BackgroundPositionY<TLength>, willSet=true) { return this }

    @RTStyleProp
    backgroundRepeat(value: Property.BackgroundRepeat, willSet=true) { return this }

    @RTStyleProp
    backgroundSize(value: Property.BackgroundSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    blockOverflow(value: Property.BlockOverflow, willSet=true) { return this }

    @RTStyleProp
    blockSize(value: Property.BlockSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlockColor(value: Property.BorderBlockColor, willSet=true) { return this }

    @RTStyleProp
    borderBlockEndColor(value: Property.BorderBlockEndColor, willSet=true) { return this }

    @RTStyleProp
    borderBlockEndStyle(value: Property.BorderBlockEndStyle, willSet=true) { return this }

    @RTStyleProp
    borderBlockEndWidth(value: Property.BorderBlockEndWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlockStartColor(value: Property.BorderBlockStartColor, willSet=true) { return this }

    @RTStyleProp
    borderBlockStartStyle(value: Property.BorderBlockStartStyle, willSet=true) { return this }

    @RTStyleProp
    borderBlockStartWidth(value: Property.BorderBlockStartWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlockStyle(value: Property.BorderBlockStyle, willSet=true) { return this }

    @RTStyleProp
    borderBlockWidth(value: Property.BorderBlockWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBottomColor(value: Property.BorderBottomColor, willSet=true) { return this }

    @RTStyleProp
    borderBottomLeftRadius(value: Property.BorderBottomLeftRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBottomRightRadius(value: Property.BorderBottomRightRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBottomStyle(value: Property.BorderBottomStyle, willSet=true) { return this }

    @RTStyleProp
    borderBottomWidth(value: Property.BorderBottomWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderCollapse(value: Property.BorderCollapse, willSet=true) { return this }

    @RTStyleProp
    borderEndEndRadius(value: Property.BorderEndEndRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderEndStartRadius(value: Property.BorderEndStartRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderImageOutset(value: Property.BorderImageOutset<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderImageRepeat(value: Property.BorderImageRepeat, willSet=true) { return this }

    @RTStyleProp
    borderImageSlice(value: Property.BorderImageSlice, willSet=true) { return this }

    @RTStyleProp
    borderImageSource(value: Property.BorderImageSource, willSet=true) { return this }

    @RTStyleProp
    borderImageWidth(value: Property.BorderImageWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderInlineColor(value: Property.BorderInlineColor, willSet=true) { return this }

    @RTStyleProp
    borderInlineEndColor(value: Property.BorderInlineEndColor, willSet=true) { return this }

    @RTStyleProp
    borderInlineEndStyle(value: Property.BorderInlineEndStyle, willSet=true) { return this }

    @RTStyleProp
    borderInlineEndWidth(value: Property.BorderInlineEndWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderInlineStartColor(value: Property.BorderInlineStartColor, willSet=true) { return this }

    @RTStyleProp
    borderInlineStartStyle(value: Property.BorderInlineStartStyle, willSet=true) { return this }

    @RTStyleProp
    borderInlineStartWidth(value: Property.BorderInlineStartWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderInlineStyle(value: Property.BorderInlineStyle, willSet=true) { return this }

    @RTStyleProp
    borderInlineWidth(value: Property.BorderInlineWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderLeftColor(value: Property.BorderLeftColor, willSet=true) { return this }

    @RTStyleProp
    borderLeftStyle(value: Property.BorderLeftStyle, willSet=true) { return this }

    @RTStyleProp
    borderLeftWidth(value: Property.BorderLeftWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderRightColor(value: Property.BorderRightColor, willSet=true) { return this }

    @RTStyleProp
    borderRightStyle(value: Property.BorderRightStyle, willSet=true) { return this }

    @RTStyleProp
    borderRightWidth(value: Property.BorderRightWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderSpacing(value: Property.BorderSpacing<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderStartEndRadius(value: Property.BorderStartEndRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderStartStartRadius(value: Property.BorderStartStartRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderTopColor(value: Property.BorderTopColor, willSet=true) { return this }

    @RTStyleProp
    borderTopLeftRadius(value: Property.BorderTopLeftRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderTopRightRadius(value: Property.BorderTopRightRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderTopStyle(value: Property.BorderTopStyle, willSet=true) { return this }

    @RTStyleProp
    borderTopWidth(value: Property.BorderTopWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    bottom(value: Property.Bottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    boxDecorationBreak(value: Property.BoxDecorationBreak, willSet=true) { return this }

    @RTStyleProp
    boxShadow(value: Property.BoxShadow, willSet=true) { return this }

    @RTStyleProp
    boxSizing(value: Property.BoxSizing, willSet=true) { return this }

    @RTStyleProp
    breakAfter(value: Property.BreakAfter, willSet=true) { return this }

    @RTStyleProp
    breakBefore(value: Property.BreakBefore, willSet=true) { return this }

    @RTStyleProp
    breakInside(value: Property.BreakInside, willSet=true) { return this }

    @RTStyleProp
    captionSide(value: Property.CaptionSide, willSet=true) { return this }

    @RTStyleProp
    caretColor(value: Property.CaretColor, willSet=true) { return this }

    @RTStyleProp
    clear(value: Property.Clear, willSet=true) { return this }

    @RTStyleProp
    clipPath(value: Property.ClipPath, willSet=true) { return this }

    @RTStyleProp
    color(value: Property.Color, willSet=true) { return this }

    @RTStyleProp
    colorAdjust(value: Property.PrintColorAdjust, willSet=true) { return this }

    @RTStyleProp
    colorScheme(value: Property.ColorScheme, willSet=true) { return this }

    @RTStyleProp
    columnCount(value: Property.ColumnCount, willSet=true) { return this }

    @RTStyleProp
    columnFill(value: Property.ColumnFill, willSet=true) { return this }

    @RTStyleProp
    columnGap(value: Property.ColumnGap<TLength>, willSet=true) { return this }

    @RTStyleProp
    columnRuleColor(value: Property.ColumnRuleColor, willSet=true) { return this }

    @RTStyleProp
    columnRuleStyle(value: Property.ColumnRuleStyle, willSet=true) { return this }

    @RTStyleProp
    columnRuleWidth(value: Property.ColumnRuleWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    columnSpan(value: Property.ColumnSpan, willSet=true) { return this }

    @RTStyleProp
    columnWidth(value: Property.ColumnWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    contain(value: Property.Contain, willSet=true) { return this }

    @RTStyleProp
    content(value: Property.Content, willSet=true) { return this }

    @RTStyleProp
    contentVisibility(value: Property.ContentVisibility, willSet=true) { return this }

    @RTStyleProp
    counterIncrement(value: Property.CounterIncrement, willSet=true) { return this }

    @RTStyleProp
    counterReset(value: Property.CounterReset, willSet=true) { return this }

    @RTStyleProp
    counterSet(value: Property.CounterSet, willSet=true) { return this }

    @RTStyleProp
    cursor(value: Property.Cursor, willSet=true) { return this }

    @RTStyleProp
    direction(value: Property.Direction, willSet=true) { return this }

    @RTStyleProp
    display(value: Property.Display, willSet=true) { return this }

    @RTStyleProp
    emptyCells(value: Property.EmptyCells, willSet=true) { return this }

    @RTStyleProp
    filter(value: Property.Filter, willSet=true) { return this }

    @RTStyleProp
    flexBasis(value: Property.FlexBasis<TLength>, willSet=true) { return this }

    @RTStyleProp
    flexDirection(value: Property.FlexDirection, willSet=true) { return this }

    @RTStyleProp
    flexGrow(value: Property.FlexGrow, willSet=true) { return this }

    @RTStyleProp
    flexShrink(value: Property.FlexShrink, willSet=true) { return this }

    @RTStyleProp
    flexWrap(value: Property.FlexWrap, willSet=true) { return this }

    @RTStyleProp
    float(value: Property.Float, willSet=true) { return this }

    @RTStyleProp
    fontFamily(value: Property.FontFamily, willSet=true) { return this }

    @RTStyleProp
    fontFeatureSettings(value: Property.FontFeatureSettings, willSet=true) { return this }

    @RTStyleProp
    fontKerning(value: Property.FontKerning, willSet=true) { return this }

    @RTStyleProp
    fontLanguageOverride(value: Property.FontLanguageOverride, willSet=true) { return this }

    @RTStyleProp
    fontOpticalSizing(value: Property.FontOpticalSizing, willSet=true) { return this }

    @RTStyleProp
    fontSize(value: Property.FontSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    fontSizeAdjust(value: Property.FontSizeAdjust, willSet=true) { return this }

    @RTStyleProp
    fontSmooth(value: Property.FontSmooth<TLength>, willSet=true) { return this }

    @RTStyleProp
    fontStretch(value: Property.FontStretch, willSet=true) { return this }

    @RTStyleProp
    fontStyle(value: Property.FontStyle, willSet=true) { return this }

    @RTStyleProp
    fontSynthesis(value: Property.FontSynthesis, willSet=true) { return this }

    @RTStyleProp
    fontVariant(value: Property.FontVariant, willSet=true) { return this }

    @RTStyleProp
    fontVariantAlternates(value: Property.FontVariantAlternates, willSet=true) { return this }

    @RTStyleProp
    fontVariantCaps(value: Property.FontVariantCaps, willSet=true) { return this }

    @RTStyleProp
    fontVariantEastAsian(value: Property.FontVariantEastAsian, willSet=true) { return this }

    @RTStyleProp
    fontVariantLigatures(value: Property.FontVariantLigatures, willSet=true) { return this }

    @RTStyleProp
    fontVariantNumeric(value: Property.FontVariantNumeric, willSet=true) { return this }

    @RTStyleProp
    fontVariantPosition(value: Property.FontVariantPosition, willSet=true) { return this }

    @RTStyleProp
    fontVariationSettings(value: Property.FontVariationSettings, willSet=true) { return this }

    @RTStyleProp
    fontWeight(value: Property.FontWeight, willSet=true) { return this }

    @RTStyleProp
    forcedColorAdjust(value: Property.ForcedColorAdjust, willSet=true) { return this }

    @RTStyleProp
    gridAutoColumns(value: Property.GridAutoColumns<TLength>, willSet=true) { return this }

    @RTStyleProp
    gridAutoFlow(value: Property.GridAutoFlow, willSet=true) { return this }

    @RTStyleProp
    gridAutoRows(value: Property.GridAutoRows<TLength>, willSet=true) { return this }

    @RTStyleProp
    gridColumnEnd(value: Property.GridColumnEnd, willSet=true) { return this }

    @RTStyleProp
    gridColumnStart(value: Property.GridColumnStart, willSet=true) { return this }

    @RTStyleProp
    gridRowEnd(value: Property.GridRowEnd, willSet=true) { return this }

    @RTStyleProp
    gridRowStart(value: Property.GridRowStart, willSet=true) { return this }

    @RTStyleProp
    gridTemplateAreas(value: Property.GridTemplateAreas, willSet=true) { return this }

    @RTStyleProp
    gridTemplateColumns(value: Property.GridTemplateColumns<TLength>, willSet=true) { return this }

    @RTStyleProp
    gridTemplateRows(value: Property.GridTemplateRows<TLength>, willSet=true) { return this }

    @RTStyleProp
    hangingPunctuation(value: Property.HangingPunctuation, willSet=true) { return this }

    @RTStyleProp
    height(value: Property.Width<TLength>, willSet=true) { return this }

    @RTStyleProp
    hyphenateCharacter(value: Property.HyphenateCharacter, willSet=true) { return this }

    @RTStyleProp
    hyphens(value: Property.Hyphens, willSet=true) { return this }

    @RTStyleProp
    imageOrientation(value: Property.ImageOrientation, willSet=true) { return this }

    @RTStyleProp
    imageRendering(value: Property.ImageRendering, willSet=true) { return this }

    @RTStyleProp
    imageResolution(value: Property.ImageResolution, willSet=true) { return this }

    @RTStyleProp
    initialLetter(value: Property.InitialLetter, willSet=true) { return this }

    @RTStyleProp
    inlineSize(value: Property.InlineSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    inputSecurity(value: Property.InputSecurity, willSet=true) { return this }

    @RTStyleProp
    inset(value: Property.Inset<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetBlock(value: Property.InsetBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetBlockEnd(value: Property.InsetBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetBlockStart(value: Property.InsetBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetInline(value: Property.InsetInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetInlineEnd(value: Property.InsetInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    insetInlineStart(value: Property.InsetInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    isolation(value: Property.Isolation, willSet=true) { return this }

    @RTStyleProp
    justifyContent(value: Property.JustifyContent, willSet=true) { return this }

    @RTStyleProp
    justifyItems(value: Property.JustifyItems, willSet=true) { return this }

    @RTStyleProp
    justifySelf(value: Property.JustifySelf, willSet=true) { return this }

    @RTStyleProp
    justifyTracks(value: Property.JustifyTracks, willSet=true) { return this }

    @RTStyleProp
    left(value: Property.Left<TLength>, willSet=true) { return this }

    @RTStyleProp
    letterSpacing(value: Property.LetterSpacing<TLength>, willSet=true) { return this }

    @RTStyleProp
    lineBreak(value: Property.LineBreak, willSet=true) { return this }

    @RTStyleProp
    lineHeight(value: Property.LineHeight<TLength>, willSet=true) { return this }

    @RTStyleProp
    lineHeightStep(value: Property.LineHeightStep<TLength>, willSet=true) { return this }

    @RTStyleProp
    listStyleImage(value: Property.ListStyleImage, willSet=true) { return this }

    @RTStyleProp
    listStylePosition(value: Property.ListStylePosition, willSet=true) { return this }

    @RTStyleProp
    listStyleType(value: Property.ListStyleType, willSet=true) { return this }

    @RTStyleProp
    marginBlock(value: Property.MarginBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginBlockEnd(value: Property.MarginBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginBlockStart(value: Property.MarginBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginBottom(value: Property.MarginBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginInline(value: Property.MarginInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginInlineEnd(value: Property.MarginInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginInlineStart(value: Property.MarginInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginLeft(value: Property.MarginLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginRight(value: Property.MarginRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    marginTop(value: Property.MarginTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskBorderMode(value: Property.MaskBorderMode, willSet=true) { return this }

    @RTStyleProp
    maskBorderOutset(value: Property.MaskBorderOutset<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskBorderRepeat(value: Property.MaskBorderRepeat, willSet=true) { return this }

    @RTStyleProp
    maskBorderSlice(value: Property.MaskBorderSlice, willSet=true) { return this }

    @RTStyleProp
    maskBorderSource(value: Property.MaskBorderSource, willSet=true) { return this }

    @RTStyleProp
    maskBorderWidth(value: Property.MaskBorderWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskClip(value: Property.MaskClip, willSet=true) { return this }

    @RTStyleProp
    maskComposite(value: Property.MaskComposite, willSet=true) { return this }

    @RTStyleProp
    maskImage(value: Property.MaskImage, willSet=true) { return this }

    @RTStyleProp
    maskMode(value: Property.MaskMode, willSet=true) { return this }

    @RTStyleProp
    maskOrigin(value: Property.MaskOrigin, willSet=true) { return this }

    @RTStyleProp
    maskPosition(value: Property.MaskPosition<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskRepeat(value: Property.MaskRepeat, willSet=true) { return this }

    @RTStyleProp
    maskSize(value: Property.MaskSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskType(value: Property.MaskType, willSet=true) { return this }

    @RTStyleProp
    mathStyle(value: Property.MathStyle, willSet=true) { return this }

    @RTStyleProp
    maxBlockSize(value: Property.MaxBlockSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    maxHeight(value: Property.MaxHeight<TLength>, willSet=true) { return this }

    @RTStyleProp
    maxInlineSize(value: Property.MaxInlineSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    maxLines(value: Property.MaxLines, willSet=true) { return this }

    @RTStyleProp
    maxWidth(value: Property.MaxWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    minBlockSize(value: Property.MinBlockSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    minHeight(value: Property.MinHeight<TLength>, willSet=true) { return this }

    @RTStyleProp
    minInlineSize(value: Property.MinInlineSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    minWidth(value: Property.MinWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    mixBlendMode(value: Property.MixBlendMode, willSet=true) { return this }

    @RTStyleProp
    motionDistance(value: Property.OffsetDistance<TLength>, willSet=true) { return this }

    @RTStyleProp
    motionPath(value: Property.OffsetPath, willSet=true) { return this }

    @RTStyleProp
    motionRotation(value: Property.OffsetRotate, willSet=true) { return this }

    @RTStyleProp
    objectFit(value: Property.ObjectFit, willSet=true) { return this }

    @RTStyleProp
    objectPosition(value: Property.ObjectPosition<TLength>, willSet=true) { return this }

    @RTStyleProp
    offsetAnchor(value: Property.OffsetAnchor<TLength>, willSet=true) { return this }

    @RTStyleProp
    offsetDistance(value: Property.OffsetDistance<TLength>, willSet=true) { return this }

    @RTStyleProp
    offsetPath(value: Property.OffsetPath, willSet=true) { return this }

    @RTStyleProp
    offsetRotate(value: Property.OffsetRotate, willSet=true) { return this }

    @RTStyleProp
    offsetRotation(value: Property.OffsetRotate, willSet=true) { return this }

    @RTStyleProp
    opacity(value: Property.Opacity, willSet=true) { return this }

    @RTStyleProp
    order(value: Property.Order, willSet=true) { return this }

    @RTStyleProp
    orphans(value: Property.Orphans, willSet=true) { return this }

    @RTStyleProp
    outlineColor(value: Property.OutlineColor, willSet=true) { return this }

    @RTStyleProp
    outlineOffset(value: Property.OutlineOffset<TLength>, willSet=true) { return this }

    @RTStyleProp
    outlineStyle(value: Property.OutlineStyle, willSet=true) { return this }

    @RTStyleProp
    outlineWidth(value: Property.OutlineWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    overflowAnchor(value: Property.OverflowAnchor, willSet=true) { return this }

    @RTStyleProp
    overflowBlock(value: Property.OverflowBlock, willSet=true) { return this }

    @RTStyleProp
    overflowClipBox(value: Property.OverflowClipBox, willSet=true) { return this }

    @RTStyleProp
    overflowClipMargin(value: Property.OverflowClipMargin<TLength>, willSet=true) { return this }

    @RTStyleProp
    overflowInline(value: Property.OverflowInline, willSet=true) { return this }

    @RTStyleProp
    overflowWrap(value: Property.OverflowWrap, willSet=true) { return this }

    @RTStyleProp
    overflowX(value: Property.OverflowX, willSet=true) { return this }

    @RTStyleProp
    overflowY(value: Property.OverflowY, willSet=true) { return this }

    @RTStyleProp
    overscrollBehaviorBlock(value: Property.OverscrollBehaviorBlock, willSet=true) { return this }

    @RTStyleProp
    overscrollBehaviorInline(value: Property.OverscrollBehaviorInline, willSet=true) { return this }

    @RTStyleProp
    overscrollBehaviorX(value: Property.OverscrollBehaviorX, willSet=true) { return this }

    @RTStyleProp
    overscrollBehaviorY(value: Property.OverscrollBehaviorY, willSet=true) { return this }

    @RTStyleProp
    paddingBlock(value: Property.PaddingBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingBlockEnd(value: Property.PaddingBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingBlockStart(value: Property.PaddingBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingBottom(value: Property.PaddingBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingInline(value: Property.PaddingInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingInlineEnd(value: Property.PaddingInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingInlineStart(value: Property.PaddingInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingLeft(value: Property.PaddingLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingRight(value: Property.PaddingRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    paddingTop(value: Property.PaddingTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    pageBreakAfter(value: Property.PageBreakAfter, willSet=true) { return this }

    @RTStyleProp
    pageBreakBefore(value: Property.PageBreakBefore, willSet=true) { return this }

    @RTStyleProp
    pageBreakInside(value: Property.PageBreakInside, willSet=true) { return this }

    @RTStyleProp
    paintOrder(value: Property.PaintOrder, willSet=true) { return this }

    @RTStyleProp
    perspective(value: Property.Perspective<TLength>, willSet=true) { return this }

    @RTStyleProp
    perspectiveOrigin(value: Property.PerspectiveOrigin<TLength>, willSet=true) { return this }

    @RTStyleProp
    placeContent(value: Property.PlaceContent, willSet=true) { return this }

    @RTStyleProp
    pointerEvents(value: Property.PointerEvents, willSet=true) { return this }

    @RTStyleProp
    position(value: Property.Position, willSet=true) { return this }

    @RTStyleProp
    printColorAdjust(value: Property.PrintColorAdjust, willSet=true) { return this }

    @RTStyleProp
    quotes(value: Property.Quotes, willSet=true) { return this }

    @RTStyleProp
    resize(value: Property.Resize, willSet=true) { return this }

    @RTStyleProp
    right(value: Property.Right<TLength>, willSet=true) { return this }

    @RTStyleProp
    rotate(value: Property.Rotate, willSet=true) { return this }

    @RTStyleProp
    rowGap(value: Property.RowGap<TLength>, willSet=true) { return this }

    @RTStyleProp
    rubyAlign(value: Property.RubyAlign, willSet=true) { return this }

    @RTStyleProp
    rubyMerge(value: Property.RubyMerge, willSet=true) { return this }

    @RTStyleProp
    rubyPosition(value: Property.RubyPosition, willSet=true) { return this }

    @RTStyleProp
    scale(value: Property.Scale, willSet=true) { return this }

    @RTStyleProp
    scrollBehavior(value: Property.ScrollBehavior, willSet=true) { return this }

    @RTStyleProp
    scrollMargin(value: Property.ScrollMargin<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginBlock(value: Property.ScrollMarginBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginBlockEnd(value: Property.ScrollMarginBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginBlockStart(value: Property.ScrollMarginBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginBottom(value: Property.ScrollMarginBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginInline(value: Property.ScrollMarginInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginInlineEnd(value: Property.ScrollMarginInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginInlineStart(value: Property.ScrollMarginInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginLeft(value: Property.ScrollMarginLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginRight(value: Property.ScrollMarginRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollMarginTop(value: Property.ScrollMarginTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPadding(value: Property.ScrollPadding<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingBlock(value: Property.ScrollPaddingBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingBlockEnd(value: Property.ScrollPaddingBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingBlockStart(value: Property.ScrollPaddingBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingBottom(value: Property.ScrollPaddingBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingInline(value: Property.ScrollPaddingInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingInlineEnd(value: Property.ScrollPaddingInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingInlineStart(value: Property.ScrollPaddingInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingLeft(value: Property.ScrollPaddingLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingRight(value: Property.ScrollPaddingRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollPaddingTop(value: Property.ScrollPaddingTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapAlign(value: Property.ScrollSnapAlign, willSet=true) { return this }

    @RTStyleProp
    scrollSnapMargin(value: Property.ScrollMargin<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapMarginBottom(value: Property.ScrollMarginBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapMarginLeft(value: Property.ScrollMarginLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapMarginRight(value: Property.ScrollMarginRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapMarginTop(value: Property.ScrollMarginTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    scrollSnapStop(value: Property.ScrollSnapStop, willSet=true) { return this }

    @RTStyleProp
    scrollSnapType(value: Property.ScrollSnapType, willSet=true) { return this }

    @RTStyleProp
    scrollbarColor(value: Property.ScrollbarColor, willSet=true) { return this }

    @RTStyleProp
    scrollbarGutter(value: Property.ScrollbarGutter, willSet=true) { return this }

    @RTStyleProp
    scrollbarWidth(value: Property.ScrollbarWidth, willSet=true) { return this }

    @RTStyleProp
    shapeImageThreshold(value: Property.ShapeImageThreshold, willSet=true) { return this }

    @RTStyleProp
    shapeMargin(value: Property.ShapeMargin<TLength>, willSet=true) { return this }

    @RTStyleProp
    shapeOutside(value: Property.ShapeOutside, willSet=true) { return this }

    @RTStyleProp
    tabSize(value: Property.TabSize<TLength>, willSet=true) { return this }

    @RTStyleProp
    tableLayout(value: Property.TableLayout, willSet=true) { return this }

    @RTStyleProp
    textAlign(value: Property.TextAlign, willSet=true) { return this }

    @RTStyleProp
    textAlignLast(value: Property.TextAlignLast, willSet=true) { return this }

    @RTStyleProp
    textCombineUpright(value: Property.TextCombineUpright, willSet=true) { return this }

    @RTStyleProp
    textDecorationColor(value: Property.TextDecorationColor, willSet=true) { return this }

    @RTStyleProp
    textDecorationLine(value: Property.TextDecorationLine, willSet=true) { return this }

    @RTStyleProp
    textDecorationSkip(value: Property.TextDecorationSkip, willSet=true) { return this }

    @RTStyleProp
    textDecorationSkipInk(value: Property.TextDecorationSkipInk, willSet=true) { return this }

    @RTStyleProp
    textDecorationStyle(value: Property.TextDecorationStyle, willSet=true) { return this }

    @RTStyleProp
    textDecorationThickness(value: Property.TextDecorationThickness<TLength>, willSet=true) { return this }

    @RTStyleProp
    textDecorationWidth(value: Property.TextDecorationThickness<TLength>, willSet=true) { return this }

    @RTStyleProp
    textEmphasisColor(value: Property.TextEmphasisColor, willSet=true) { return this }

    @RTStyleProp
    textEmphasisPosition(value: Property.TextEmphasisPosition, willSet=true) { return this }

    @RTStyleProp
    textEmphasisStyle(value: Property.TextEmphasisStyle, willSet=true) { return this }

    @RTStyleProp
    textIndent(value: Property.TextIndent<TLength>, willSet=true) { return this }

    @RTStyleProp
    textJustify(value: Property.TextJustify, willSet=true) { return this }

    @RTStyleProp
    textOrientation(value: Property.TextOrientation, willSet=true) { return this }

    @RTStyleProp
    textOverflow(value: Property.TextOverflow, willSet=true) { return this }

    @RTStyleProp
    textRendering(value: Property.TextRendering, willSet=true) { return this }

    @RTStyleProp
    textShadow(value: Property.TextShadow, willSet=true) { return this }

    @RTStyleProp
    textSizeAdjust(value: Property.TextSizeAdjust, willSet=true) { return this }

    @RTStyleProp
    textTransform(value: Property.TextTransform, willSet=true) { return this }

    @RTStyleProp
    textUnderlineOffset(value: Property.TextUnderlineOffset<TLength>, willSet=true) { return this }

    @RTStyleProp
    textUnderlinePosition(value: Property.TextUnderlinePosition, willSet=true) { return this }

    @RTStyleProp
    top(value: Property.Top<TLength>, willSet=true) { return this }

    @RTStyleProp
    touchAction(value: Property.TouchAction, willSet=true) { return this }

    @RTStyleProp
    transform(value: Property.Transform, willSet=true) { return this }

    @RTStyleProp
    transformBox(value: Property.TransformBox, willSet=true) { return this }

    @RTStyleProp
    transformOrigin(value: Property.TransformOrigin<TLength>, willSet=true) { return this }

    @RTStyleProp
    transformStyle(value: Property.TransformStyle, willSet=true) { return this }

    @RTStyleProp
    transitionDelay(value: Property.TransitionDelay<TTime>, willSet=true) { return this }

    @RTStyleProp
    transitionDuration(value: Property.TransitionDuration<TTime>, willSet=true) { return this }

    @RTStyleProp
    transitionProperty(value: Property.TransitionProperty, willSet=true) { return this }

    @RTStyleProp
    transitionTimingFunction(value: Property.TransitionTimingFunction, willSet=true) { return this }

    @RTStyleProp
    translate(value: Property.Translate<TLength>, willSet=true) { return this }

    @RTStyleProp
    unicodeBidi(value: Property.UnicodeBidi, willSet=true) { return this }

    @RTStyleProp
    userSelect(value: Property.UserSelect, willSet=true) { return this }

    @RTStyleProp
    verticalAlign(value: Property.VerticalAlign<TLength>, willSet=true) { return this }

    @RTStyleProp
    visibility(value: Property.Visibility, willSet=true) { return this }

    @RTStyleProp
    whiteSpace(value: Property.WhiteSpace, willSet=true) { return this }

    @RTStyleProp
    widows(value: Property.Widows, willSet=true) { return this }

    @RTStyleProp
    width(value: Property.Width<TLength>, willSet=true) { return this }

    @RTStyleProp
    willChange(value: Property.WillChange, willSet=true) { return this }

    @RTStyleProp
    wordBreak(value: Property.WordBreak, willSet=true) { return this }

    @RTStyleProp
    wordSpacing(value: Property.WordSpacing<TLength>, willSet=true) { return this }

    @RTStyleProp
    wordWrap(value: Property.WordWrap, willSet=true) { return this }

    @RTStyleProp
    writingMode(value: Property.WritingMode, willSet=true) { return this }

    @RTStyleProp
    zIndex(value: Property.ZIndex, willSet=true) { return this }

    @RTStyleProp
    zoom(value: Property.Zoom, willSet=true) { return this }

    @RTStyleProp
    all(value: Property.All, willSet=true) { return this }

    @RTStyleProp
    animation(value: Property.Animation<TTime>, willSet=true) { return this }

    @RTStyleProp
    background(value: Property.Background<TLength>, willSet=true) { return this }

    @RTStyleProp
    backgroundPosition(value: Property.BackgroundPosition<TLength>, willSet=true) { return this }

    @RTStyleProp
    border(value: Property.Border<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlock(value: Property.BorderBlock<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlockEnd(value: Property.BorderBlockEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBlockStart(value: Property.BorderBlockStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderBottom(value: Property.BorderBottom<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderColor(value: Property.BorderColor, willSet=true) { return this }

    @RTStyleProp
    borderImage(value: Property.BorderImage, willSet=true) { return this }

    @RTStyleProp
    borderInline(value: Property.BorderInline<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderInlineEnd(value: Property.BorderInlineEnd<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderInlineStart(value: Property.BorderInlineStart<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderLeft(value: Property.BorderLeft<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderRadius(value: Property.BorderRadius<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderRight(value: Property.BorderRight<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderStyle(value: Property.BorderStyle, willSet=true) { return this }

    @RTStyleProp
    borderTop(value: Property.BorderTop<TLength>, willSet=true) { return this }

    @RTStyleProp
    borderWidth(value: Property.BorderWidth<TLength>, willSet=true) { return this }

    @RTStyleProp
    columnRule(value: Property.ColumnRule<TLength>, willSet=true) { return this }

    @RTStyleProp
    columns(value: Property.Columns<TLength>, willSet=true) { return this }

    @RTStyleProp
    flex(value: Property.Flex<TLength>, willSet=true) { return this }

    @RTStyleProp
    flexFlow(value: Property.FlexFlow, willSet=true) { return this }

    @RTStyleProp
    font(value: Property.Font, willSet=true) { return this }

    @RTStyleProp
    gap(value: Property.Gap<TLength>, willSet=true) { return this }

    @RTStyleProp
    grid(value: Property.Grid, willSet=true) { return this }

    @RTStyleProp
    gridArea(value: Property.GridArea, willSet=true) { return this }

    @RTStyleProp
    gridColumn(value: Property.GridColumn, willSet=true) { return this }

    @RTStyleProp
    gridRow(value: Property.GridRow, willSet=true) { return this }

    @RTStyleProp
    gridTemplate(value: Property.GridTemplate, willSet=true) { return this }

    @RTStyleProp
    lineClamp(value: Property.LineClamp, willSet=true) { return this }

    @RTStyleProp
    listStyle(value: Property.ListStyle, willSet=true) { return this }

    @RTStyleProp
    margin(value: Property.Margin<TLength>, willSet=true) { return this }

    @RTStyleProp
    mask(value: Property.Mask<TLength>, willSet=true) { return this }

    @RTStyleProp
    maskBorder(value: Property.MaskBorder, willSet=true) { return this }

    @RTStyleProp
    motion(value: Property.Offset<TLength>, willSet=true) { return this }

    @RTStyleProp
    offset(value: Property.Offset<TLength>, willSet=true) { return this }

    @RTStyleProp
    outline(value: Property.Outline<TLength>, willSet=true) { return this }

    @RTStyleProp
    overflow(value: Property.Overflow, willSet=true) { return this }

    @RTStyleProp
    overscrollBehavior(value: Property.OverscrollBehavior, willSet=true) { return this }

    @RTStyleProp
    padding(value: Property.Padding<TLength>, willSet=true) { return this }

    @RTStyleProp
    placeItems(value: Property.PlaceItems, willSet=true) { return this }

    @RTStyleProp
    placeSelf(value: Property.PlaceSelf, willSet=true) { return this }

    @RTStyleProp
    textDecoration(value: Property.TextDecoration<TLength>, willSet=true) { return this }

    @RTStyleProp
    textEmphasis(value: Property.TextEmphasis, willSet=true) { return this }

    @RTStyleProp
    transition(value: Property.Transition<TTime>, willSet=true) { return this }

}
