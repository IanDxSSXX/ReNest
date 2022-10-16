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
import ReactUIBase from "./ReactUIBase";

function RUIStyleProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        (this as ReactUIWithStyle).setStyle(propertyKey, args[0], args[1])
        return originalValue.apply(this, args);
    }
}

function RUIElementProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        (this as ReactUIWithStyle).setProp(propertyKey, args[0], args[1])
        return originalValue.apply(this, args);
    }
}

export default class ReactUIWithStyle<TLength = (string & {}) | 0, TTime = string & {}> extends ReactUIBase {
    IAmReactUIWithStyle = true

    // ---* Events from react/ReactUIHH.d.tx -> DOMAttributes
    // ---- Clipboard Events
    @RUIElementProp
    onCopy(value: ClipboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCopyCapture(value: ClipboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCut(value: ClipboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCutCapture(value: ClipboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPaste(value: ClipboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPasteCapture(value: ClipboardEventHandler, willSet=true) { return this }

    // ---- Composition Events
    @RUIElementProp
    onCompositionEnd(value: CompositionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCompositionEndCapture(value: CompositionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCompositionStart(value: CompositionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCompositionStartCapture(value: CompositionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCompositionUpdate(value: CompositionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCompositionUpdateCapture(value: CompositionEventHandler, willSet=true) { return this }

    // ---- Focus Events
    @RUIElementProp
    onFocus(value: FocusEventHandler, willSet=true) { return this }

    @RUIElementProp
    onFocusCapture(value: FocusEventHandler, willSet=true) { return this }

    @RUIElementProp
    onBlur(value: FocusEventHandler, willSet=true) { return this }

    @RUIElementProp
    onBlurCapture(value: FocusEventHandler, willSet=true) { return this }

    // ---- Form Events
    @RUIElementProp
    onChange(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onChangeCapture(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onBeforeInput(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onBeforeInputCapture(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onInput(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onInputCapture(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onReset(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onResetCapture(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSubmit(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSubmitCapture(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onInvalid(value: FormEventHandler, willSet=true) { return this }

    @RUIElementProp
    onInvalidCapture(value: FormEventHandler, willSet=true) { return this }

    // ---- Image Events
    @RUIElementProp
    onLoad(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onError(value: ReactEventHandler, willSet=true) { return this }

    // ---- also a Media Event
    @RUIElementProp
    onErrorCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- also a Media Event
    // ---- Keyboard Events
    @RUIElementProp
    onKeyDown(value: KeyboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onKeyDownCapture(value: KeyboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onKeyPress(value: KeyboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onKeyPressCapture(value: KeyboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onKeyUp(value: KeyboardEventHandler, willSet=true) { return this }

    @RUIElementProp
    onKeyUpCapture(value: KeyboardEventHandler, willSet=true) { return this }

    // ---- Media Events
    @RUIElementProp
    onAbort(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAbortCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCanPlay(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCanPlayCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCanPlayThrough(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onCanPlayThroughCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDurationChange(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDurationChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEmptied(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEmptiedCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEncrypted(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEncryptedCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEnded(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onEndedCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadedData(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadedDataCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadedMetadata(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadedMetadataCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadStart(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLoadStartCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPause(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPauseCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPlay(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPlayCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPlaying(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPlayingCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onProgress(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onProgressCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onRateChange(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onRateChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSeeked(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSeekedCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSeeking(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSeekingCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onStalled(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onStalledCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSuspend(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSuspendCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTimeUpdate(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTimeUpdateCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onVolumeChange(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onVolumeChangeCapture(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onWaiting(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onWaitingCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- MouseEvents
    @RUIElementProp
    onAuxClick(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAuxClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onClick(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onContextMenu(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onContextMenuCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDoubleClick(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDoubleClickCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDrag(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragEnd(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragEndCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragEnter(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragEnterCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragExit(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragExitCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragLeave(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragLeaveCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragOver(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragOverCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragStart(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDragStartCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDrop(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onDropCapture(value: DragEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseDown(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseDownCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseEnter(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseLeave(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseMove(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseMoveCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseOut(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseOutCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseOver(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseOverCapture(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseUp(value: MouseEventHandler, willSet=true) { return this }

    @RUIElementProp
    onMouseUpCapture(value: MouseEventHandler, willSet=true) { return this }

    // ---- Selection Events
    @RUIElementProp
    onSelect(value: ReactEventHandler, willSet=true) { return this }

    @RUIElementProp
    onSelectCapture(value: ReactEventHandler, willSet=true) { return this }

    // ---- Touch Events
    @RUIElementProp
    onTouchCancel(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchCancelCapture(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchEnd(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchEndCapture(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchMove(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchMoveCapture(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchStart(value: TouchEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTouchStartCapture(value: TouchEventHandler, willSet=true) { return this }

    // ---- Pointer Events
    @RUIElementProp
    onPointerDown(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerDownCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerMove(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerMoveCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerUp(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerUpCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerCancel(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerCancelCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerEnter(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerEnterCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerLeave(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerLeaveCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerOver(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerOverCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerOut(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onPointerOutCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onGotPointerCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onGotPointerCaptureCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLostPointerCapture(value: PointerEventHandler, willSet=true) { return this }

    @RUIElementProp
    onLostPointerCaptureCapture(value: PointerEventHandler, willSet=true) { return this }

    // ---- UI Events
    @RUIElementProp
    onScroll(value: UIEventHandler, willSet=true) { return this }

    @RUIElementProp
    onScrollCapture(value: UIEventHandler, willSet=true) { return this }

    // ---- Wheel Events
    @RUIElementProp
    onWheel(value: WheelEventHandler, willSet=true) { return this }

    @RUIElementProp
    onWheelCapture(value: WheelEventHandler, willSet=true) { return this }

    // ---- Animation Events
    @RUIElementProp
    onAnimationStart(value: AnimationEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAnimationStartCapture(value: AnimationEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAnimationEnd(value: AnimationEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAnimationEndCapture(value: AnimationEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAnimationIteration(value: AnimationEventHandler, willSet=true) { return this }

    @RUIElementProp
    onAnimationIterationCapture(value: AnimationEventHandler, willSet=true) { return this }

    // ---- Transition Events
    @RUIElementProp
    onTransitionEnd(value: TransitionEventHandler, willSet=true) { return this }

    @RUIElementProp
    onTransitionEndCapture(value: TransitionEventHandler, willSet=true) { return this }

    // ---* All styles from csstype/ReactUIHH.d.ts
    @RUIStyleProp
    accentColor(value: Property.AccentColor, willSet=true) { return this }

    @RUIStyleProp
    alignContent(value: Property.AlignContent, willSet=true) { return this }

    @RUIStyleProp
    alignItems(value: Property.AlignItems, willSet=true) { return this }

    @RUIStyleProp
    alignSelf(value: Property.AlignSelf, willSet=true) { return this }

    @RUIStyleProp
    alignTracks(value: Property.AlignTracks, willSet=true) { return this }

    @RUIStyleProp
    animationDelay(value: Property.AnimationDelay<TTime>, willSet=true) { return this }

    @RUIStyleProp
    animationDirection(value: Property.AnimationDirection, willSet=true) { return this }

    @RUIStyleProp
    animationDuration(value: Property.AnimationDuration<TTime>, willSet=true) { return this }

    @RUIStyleProp
    animationFillMode(value: Property.AnimationFillMode, willSet=true) { return this }

    @RUIStyleProp
    animationIterationCount(value: Property.AnimationIterationCount, willSet=true) { return this }

    @RUIStyleProp
    animationName(value: Property.AnimationName, willSet=true) { return this }

    @RUIStyleProp
    animationPlayState(value: Property.AnimationPlayState, willSet=true) { return this }

    @RUIStyleProp
    animationTimeline(value: Property.AnimationTimeline, willSet=true) { return this }

    @RUIStyleProp
    animationTimingFunction(value: Property.AnimationTimingFunction, willSet=true) { return this }

    @RUIStyleProp
    appearance(value: Property.Appearance, willSet=true) { return this }

    @RUIStyleProp
    aspectRatio(value: Property.AspectRatio, willSet=true) { return this }

    @RUIStyleProp
    backdropFilter(value: Property.BackdropFilter, willSet=true) { return this }

    @RUIStyleProp
    backfaceVisibility(value: Property.BackfaceVisibility, willSet=true) { return this }

    @RUIStyleProp
    backgroundAttachment(value: Property.BackgroundAttachment, willSet=true) { return this }

    @RUIStyleProp
    backgroundBlendMode(value: Property.BackgroundBlendMode, willSet=true) { return this }

    @RUIStyleProp
    backgroundClip(value: Property.BackgroundClip, willSet=true) { return this }

    @RUIStyleProp
    backgroundColor(value: Property.BackgroundColor, willSet=true) { return this }

    @RUIStyleProp
    backgroundImage(value: Property.BackgroundImage, willSet=true) { return this }

    @RUIStyleProp
    backgroundOrigin(value: Property.BackgroundOrigin, willSet=true) { return this }

    @RUIStyleProp
    backgroundPositionX(value: Property.BackgroundPositionX<TLength>, willSet=true) { return this }

    @RUIStyleProp
    backgroundPositionY(value: Property.BackgroundPositionY<TLength>, willSet=true) { return this }

    @RUIStyleProp
    backgroundRepeat(value: Property.BackgroundRepeat, willSet=true) { return this }

    @RUIStyleProp
    backgroundSize(value: Property.BackgroundSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    blockOverflow(value: Property.BlockOverflow, willSet=true) { return this }

    @RUIStyleProp
    blockSize(value: Property.BlockSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlockColor(value: Property.BorderBlockColor, willSet=true) { return this }

    @RUIStyleProp
    borderBlockEndColor(value: Property.BorderBlockEndColor, willSet=true) { return this }

    @RUIStyleProp
    borderBlockEndStyle(value: Property.BorderBlockEndStyle, willSet=true) { return this }

    @RUIStyleProp
    borderBlockEndWidth(value: Property.BorderBlockEndWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlockStartColor(value: Property.BorderBlockStartColor, willSet=true) { return this }

    @RUIStyleProp
    borderBlockStartStyle(value: Property.BorderBlockStartStyle, willSet=true) { return this }

    @RUIStyleProp
    borderBlockStartWidth(value: Property.BorderBlockStartWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlockStyle(value: Property.BorderBlockStyle, willSet=true) { return this }

    @RUIStyleProp
    borderBlockWidth(value: Property.BorderBlockWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBottomColor(value: Property.BorderBottomColor, willSet=true) { return this }

    @RUIStyleProp
    borderBottomLeftRadius(value: Property.BorderBottomLeftRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBottomRightRadius(value: Property.BorderBottomRightRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBottomStyle(value: Property.BorderBottomStyle, willSet=true) { return this }

    @RUIStyleProp
    borderBottomWidth(value: Property.BorderBottomWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderCollapse(value: Property.BorderCollapse, willSet=true) { return this }

    @RUIStyleProp
    borderEndEndRadius(value: Property.BorderEndEndRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderEndStartRadius(value: Property.BorderEndStartRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderImageOutset(value: Property.BorderImageOutset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderImageRepeat(value: Property.BorderImageRepeat, willSet=true) { return this }

    @RUIStyleProp
    borderImageSlice(value: Property.BorderImageSlice, willSet=true) { return this }

    @RUIStyleProp
    borderImageSource(value: Property.BorderImageSource, willSet=true) { return this }

    @RUIStyleProp
    borderImageWidth(value: Property.BorderImageWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderInlineColor(value: Property.BorderInlineColor, willSet=true) { return this }

    @RUIStyleProp
    borderInlineEndColor(value: Property.BorderInlineEndColor, willSet=true) { return this }

    @RUIStyleProp
    borderInlineEndStyle(value: Property.BorderInlineEndStyle, willSet=true) { return this }

    @RUIStyleProp
    borderInlineEndWidth(value: Property.BorderInlineEndWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderInlineStartColor(value: Property.BorderInlineStartColor, willSet=true) { return this }

    @RUIStyleProp
    borderInlineStartStyle(value: Property.BorderInlineStartStyle, willSet=true) { return this }

    @RUIStyleProp
    borderInlineStartWidth(value: Property.BorderInlineStartWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderInlineStyle(value: Property.BorderInlineStyle, willSet=true) { return this }

    @RUIStyleProp
    borderInlineWidth(value: Property.BorderInlineWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderLeftColor(value: Property.BorderLeftColor, willSet=true) { return this }

    @RUIStyleProp
    borderLeftStyle(value: Property.BorderLeftStyle, willSet=true) { return this }

    @RUIStyleProp
    borderLeftWidth(value: Property.BorderLeftWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderRightColor(value: Property.BorderRightColor, willSet=true) { return this }

    @RUIStyleProp
    borderRightStyle(value: Property.BorderRightStyle, willSet=true) { return this }

    @RUIStyleProp
    borderRightWidth(value: Property.BorderRightWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderSpacing(value: Property.BorderSpacing<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderStartEndRadius(value: Property.BorderStartEndRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderStartStartRadius(value: Property.BorderStartStartRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderTopColor(value: Property.BorderTopColor, willSet=true) { return this }

    @RUIStyleProp
    borderTopLeftRadius(value: Property.BorderTopLeftRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderTopRightRadius(value: Property.BorderTopRightRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderTopStyle(value: Property.BorderTopStyle, willSet=true) { return this }

    @RUIStyleProp
    borderTopWidth(value: Property.BorderTopWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    bottom(value: Property.Bottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    boxDecorationBreak(value: Property.BoxDecorationBreak, willSet=true) { return this }

    @RUIStyleProp
    boxShadow(value: Property.BoxShadow, willSet=true) { return this }

    @RUIStyleProp
    boxSizing(value: Property.BoxSizing, willSet=true) { return this }

    @RUIStyleProp
    breakAfter(value: Property.BreakAfter, willSet=true) { return this }

    @RUIStyleProp
    breakBefore(value: Property.BreakBefore, willSet=true) { return this }

    @RUIStyleProp
    breakInside(value: Property.BreakInside, willSet=true) { return this }

    @RUIStyleProp
    captionSide(value: Property.CaptionSide, willSet=true) { return this }

    @RUIStyleProp
    caretColor(value: Property.CaretColor, willSet=true) { return this }

    @RUIStyleProp
    clear(value: Property.Clear, willSet=true) { return this }

    @RUIStyleProp
    clipPath(value: Property.ClipPath, willSet=true) { return this }

    @RUIStyleProp
    color(value: Property.Color, willSet=true) { return this }

    @RUIStyleProp
    colorAdjust(value: Property.PrintColorAdjust, willSet=true) { return this }

    @RUIStyleProp
    colorScheme(value: Property.ColorScheme, willSet=true) { return this }

    @RUIStyleProp
    columnCount(value: Property.ColumnCount, willSet=true) { return this }

    @RUIStyleProp
    columnFill(value: Property.ColumnFill, willSet=true) { return this }

    @RUIStyleProp
    columnGap(value: Property.ColumnGap<TLength>, willSet=true) { return this }

    @RUIStyleProp
    columnRuleColor(value: Property.ColumnRuleColor, willSet=true) { return this }

    @RUIStyleProp
    columnRuleStyle(value: Property.ColumnRuleStyle, willSet=true) { return this }

    @RUIStyleProp
    columnRuleWidth(value: Property.ColumnRuleWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    columnSpan(value: Property.ColumnSpan, willSet=true) { return this }

    @RUIStyleProp
    columnWidth(value: Property.ColumnWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    contain(value: Property.Contain, willSet=true) { return this }

    @RUIStyleProp
    content(value: Property.Content, willSet=true) { return this }

    @RUIStyleProp
    contentVisibility(value: Property.ContentVisibility, willSet=true) { return this }

    @RUIStyleProp
    counterIncrement(value: Property.CounterIncrement, willSet=true) { return this }

    @RUIStyleProp
    counterReset(value: Property.CounterReset, willSet=true) { return this }

    @RUIStyleProp
    counterSet(value: Property.CounterSet, willSet=true) { return this }

    @RUIStyleProp
    cursor(value: Property.Cursor, willSet=true) { return this }

    @RUIStyleProp
    direction(value: Property.Direction, willSet=true) { return this }

    @RUIStyleProp
    display(value: Property.Display, willSet=true) { return this }

    @RUIStyleProp
    emptyCells(value: Property.EmptyCells, willSet=true) { return this }

    @RUIStyleProp
    filter(value: Property.Filter, willSet=true) { return this }

    @RUIStyleProp
    flexBasis(value: Property.FlexBasis<TLength>, willSet=true) { return this }

    @RUIStyleProp
    flexDirection(value: Property.FlexDirection, willSet=true) { return this }

    @RUIStyleProp
    flexGrow(value: Property.FlexGrow, willSet=true) { return this }

    @RUIStyleProp
    flexShrink(value: Property.FlexShrink, willSet=true) { return this }

    @RUIStyleProp
    flexWrap(value: Property.FlexWrap, willSet=true) { return this }

    @RUIStyleProp
    float(value: Property.Float, willSet=true) { return this }

    @RUIStyleProp
    fontFamily(value: Property.FontFamily, willSet=true) { return this }

    @RUIStyleProp
    fontFeatureSettings(value: Property.FontFeatureSettings, willSet=true) { return this }

    @RUIStyleProp
    fontKerning(value: Property.FontKerning, willSet=true) { return this }

    @RUIStyleProp
    fontLanguageOverride(value: Property.FontLanguageOverride, willSet=true) { return this }

    @RUIStyleProp
    fontOpticalSizing(value: Property.FontOpticalSizing, willSet=true) { return this }

    @RUIStyleProp
    fontSize(value: Property.FontSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    fontSizeAdjust(value: Property.FontSizeAdjust, willSet=true) { return this }

    @RUIStyleProp
    fontSmooth(value: Property.FontSmooth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    fontStretch(value: Property.FontStretch, willSet=true) { return this }

    @RUIStyleProp
    fontStyle(value: Property.FontStyle, willSet=true) { return this }

    @RUIStyleProp
    fontSynthesis(value: Property.FontSynthesis, willSet=true) { return this }

    @RUIStyleProp
    fontVariant(value: Property.FontVariant, willSet=true) { return this }

    @RUIStyleProp
    fontVariantAlternates(value: Property.FontVariantAlternates, willSet=true) { return this }

    @RUIStyleProp
    fontVariantCaps(value: Property.FontVariantCaps, willSet=true) { return this }

    @RUIStyleProp
    fontVariantEastAsian(value: Property.FontVariantEastAsian, willSet=true) { return this }

    @RUIStyleProp
    fontVariantLigatures(value: Property.FontVariantLigatures, willSet=true) { return this }

    @RUIStyleProp
    fontVariantNumeric(value: Property.FontVariantNumeric, willSet=true) { return this }

    @RUIStyleProp
    fontVariantPosition(value: Property.FontVariantPosition, willSet=true) { return this }

    @RUIStyleProp
    fontVariationSettings(value: Property.FontVariationSettings, willSet=true) { return this }

    @RUIStyleProp
    fontWeight(value: Property.FontWeight, willSet=true) { return this }

    @RUIStyleProp
    forcedColorAdjust(value: Property.ForcedColorAdjust, willSet=true) { return this }

    @RUIStyleProp
    gridAutoColumns(value: Property.GridAutoColumns<TLength>, willSet=true) { return this }

    @RUIStyleProp
    gridAutoFlow(value: Property.GridAutoFlow, willSet=true) { return this }

    @RUIStyleProp
    gridAutoRows(value: Property.GridAutoRows<TLength>, willSet=true) { return this }

    @RUIStyleProp
    gridColumnEnd(value: Property.GridColumnEnd, willSet=true) { return this }

    @RUIStyleProp
    gridColumnStart(value: Property.GridColumnStart, willSet=true) { return this }

    @RUIStyleProp
    gridRowEnd(value: Property.GridRowEnd, willSet=true) { return this }

    @RUIStyleProp
    gridRowStart(value: Property.GridRowStart, willSet=true) { return this }

    @RUIStyleProp
    gridTemplateAreas(value: Property.GridTemplateAreas, willSet=true) { return this }

    @RUIStyleProp
    gridTemplateColumns(value: Property.GridTemplateColumns<TLength>, willSet=true) { return this }

    @RUIStyleProp
    gridTemplateRows(value: Property.GridTemplateRows<TLength>, willSet=true) { return this }

    @RUIStyleProp
    hangingPunctuation(value: Property.HangingPunctuation, willSet=true) { return this }

    @RUIStyleProp
    height(value: Property.Width<TLength>, willSet=true) { return this }

    @RUIStyleProp
    hyphenateCharacter(value: Property.HyphenateCharacter, willSet=true) { return this }

    @RUIStyleProp
    hyphens(value: Property.Hyphens, willSet=true) { return this }

    @RUIStyleProp
    imageOrientation(value: Property.ImageOrientation, willSet=true) { return this }

    @RUIStyleProp
    imageRendering(value: Property.ImageRendering, willSet=true) { return this }

    @RUIStyleProp
    imageResolution(value: Property.ImageResolution, willSet=true) { return this }

    @RUIStyleProp
    initialLetter(value: Property.InitialLetter, willSet=true) { return this }

    @RUIStyleProp
    inlineSize(value: Property.InlineSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    inputSecurity(value: Property.InputSecurity, willSet=true) { return this }

    @RUIStyleProp
    inset(value: Property.Inset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetBlock(value: Property.InsetBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetBlockEnd(value: Property.InsetBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetBlockStart(value: Property.InsetBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetInline(value: Property.InsetInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetInlineEnd(value: Property.InsetInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    insetInlineStart(value: Property.InsetInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    isolation(value: Property.Isolation, willSet=true) { return this }

    @RUIStyleProp
    justifyContent(value: Property.JustifyContent, willSet=true) { return this }

    @RUIStyleProp
    justifyItems(value: Property.JustifyItems, willSet=true) { return this }

    @RUIStyleProp
    justifySelf(value: Property.JustifySelf, willSet=true) { return this }

    @RUIStyleProp
    justifyTracks(value: Property.JustifyTracks, willSet=true) { return this }

    @RUIStyleProp
    left(value: Property.Left<TLength>, willSet=true) { return this }

    @RUIStyleProp
    letterSpacing(value: Property.LetterSpacing<TLength>, willSet=true) { return this }

    @RUIStyleProp
    lineBreak(value: Property.LineBreak, willSet=true) { return this }

    @RUIStyleProp
    lineHeight(value: Property.LineHeight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    lineHeightStep(value: Property.LineHeightStep<TLength>, willSet=true) { return this }

    @RUIStyleProp
    listStyleImage(value: Property.ListStyleImage, willSet=true) { return this }

    @RUIStyleProp
    listStylePosition(value: Property.ListStylePosition, willSet=true) { return this }

    @RUIStyleProp
    listStyleType(value: Property.ListStyleType, willSet=true) { return this }

    @RUIStyleProp
    marginBlock(value: Property.MarginBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginBlockEnd(value: Property.MarginBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginBlockStart(value: Property.MarginBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginBottom(value: Property.MarginBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginInline(value: Property.MarginInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginInlineEnd(value: Property.MarginInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginInlineStart(value: Property.MarginInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginLeft(value: Property.MarginLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginRight(value: Property.MarginRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    marginTop(value: Property.MarginTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskBorderMode(value: Property.MaskBorderMode, willSet=true) { return this }

    @RUIStyleProp
    maskBorderOutset(value: Property.MaskBorderOutset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskBorderRepeat(value: Property.MaskBorderRepeat, willSet=true) { return this }

    @RUIStyleProp
    maskBorderSlice(value: Property.MaskBorderSlice, willSet=true) { return this }

    @RUIStyleProp
    maskBorderSource(value: Property.MaskBorderSource, willSet=true) { return this }

    @RUIStyleProp
    maskBorderWidth(value: Property.MaskBorderWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskClip(value: Property.MaskClip, willSet=true) { return this }

    @RUIStyleProp
    maskComposite(value: Property.MaskComposite, willSet=true) { return this }

    @RUIStyleProp
    maskImage(value: Property.MaskImage, willSet=true) { return this }

    @RUIStyleProp
    maskMode(value: Property.MaskMode, willSet=true) { return this }

    @RUIStyleProp
    maskOrigin(value: Property.MaskOrigin, willSet=true) { return this }

    @RUIStyleProp
    maskPosition(value: Property.MaskPosition<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskRepeat(value: Property.MaskRepeat, willSet=true) { return this }

    @RUIStyleProp
    maskSize(value: Property.MaskSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskType(value: Property.MaskType, willSet=true) { return this }

    @RUIStyleProp
    mathStyle(value: Property.MathStyle, willSet=true) { return this }

    @RUIStyleProp
    maxBlockSize(value: Property.MaxBlockSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maxHeight(value: Property.MaxHeight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maxInlineSize(value: Property.MaxInlineSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maxLines(value: Property.MaxLines, willSet=true) { return this }

    @RUIStyleProp
    maxWidth(value: Property.MaxWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    minBlockSize(value: Property.MinBlockSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    minHeight(value: Property.MinHeight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    minInlineSize(value: Property.MinInlineSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    minWidth(value: Property.MinWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    mixBlendMode(value: Property.MixBlendMode, willSet=true) { return this }

    @RUIStyleProp
    motionDistance(value: Property.OffsetDistance<TLength>, willSet=true) { return this }

    @RUIStyleProp
    motionPath(value: Property.OffsetPath, willSet=true) { return this }

    @RUIStyleProp
    motionRotation(value: Property.OffsetRotate, willSet=true) { return this }

    @RUIStyleProp
    objectFit(value: Property.ObjectFit, willSet=true) { return this }

    @RUIStyleProp
    objectPosition(value: Property.ObjectPosition<TLength>, willSet=true) { return this }

    @RUIStyleProp
    offsetAnchor(value: Property.OffsetAnchor<TLength>, willSet=true) { return this }

    @RUIStyleProp
    offsetDistance(value: Property.OffsetDistance<TLength>, willSet=true) { return this }

    @RUIStyleProp
    offsetPath(value: Property.OffsetPath, willSet=true) { return this }

    @RUIStyleProp
    offsetRotate(value: Property.OffsetRotate, willSet=true) { return this }

    @RUIStyleProp
    offsetRotation(value: Property.OffsetRotate, willSet=true) { return this }

    @RUIStyleProp
    opacity(value: Property.Opacity, willSet=true) { return this }

    @RUIStyleProp
    order(value: Property.Order, willSet=true) { return this }

    @RUIStyleProp
    orphans(value: Property.Orphans, willSet=true) { return this }

    @RUIStyleProp
    outlineColor(value: Property.OutlineColor, willSet=true) { return this }

    @RUIStyleProp
    outlineOffset(value: Property.OutlineOffset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    outlineStyle(value: Property.OutlineStyle, willSet=true) { return this }

    @RUIStyleProp
    outlineWidth(value: Property.OutlineWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    overflowAnchor(value: Property.OverflowAnchor, willSet=true) { return this }

    @RUIStyleProp
    overflowBlock(value: Property.OverflowBlock, willSet=true) { return this }

    @RUIStyleProp
    overflowClipBox(value: Property.OverflowClipBox, willSet=true) { return this }

    @RUIStyleProp
    overflowClipMargin(value: Property.OverflowClipMargin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    overflowInline(value: Property.OverflowInline, willSet=true) { return this }

    @RUIStyleProp
    overflowWrap(value: Property.OverflowWrap, willSet=true) { return this }

    @RUIStyleProp
    overflowX(value: Property.OverflowX, willSet=true) { return this }

    @RUIStyleProp
    overflowY(value: Property.OverflowY, willSet=true) { return this }

    @RUIStyleProp
    overscrollBehaviorBlock(value: Property.OverscrollBehaviorBlock, willSet=true) { return this }

    @RUIStyleProp
    overscrollBehaviorInline(value: Property.OverscrollBehaviorInline, willSet=true) { return this }

    @RUIStyleProp
    overscrollBehaviorX(value: Property.OverscrollBehaviorX, willSet=true) { return this }

    @RUIStyleProp
    overscrollBehaviorY(value: Property.OverscrollBehaviorY, willSet=true) { return this }

    @RUIStyleProp
    paddingBlock(value: Property.PaddingBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingBlockEnd(value: Property.PaddingBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingBlockStart(value: Property.PaddingBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingBottom(value: Property.PaddingBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingInline(value: Property.PaddingInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingInlineEnd(value: Property.PaddingInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingInlineStart(value: Property.PaddingInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingLeft(value: Property.PaddingLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingRight(value: Property.PaddingRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    paddingTop(value: Property.PaddingTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    pageBreakAfter(value: Property.PageBreakAfter, willSet=true) { return this }

    @RUIStyleProp
    pageBreakBefore(value: Property.PageBreakBefore, willSet=true) { return this }

    @RUIStyleProp
    pageBreakInside(value: Property.PageBreakInside, willSet=true) { return this }

    @RUIStyleProp
    paintOrder(value: Property.PaintOrder, willSet=true) { return this }

    @RUIStyleProp
    perspective(value: Property.Perspective<TLength>, willSet=true) { return this }

    @RUIStyleProp
    perspectiveOrigin(value: Property.PerspectiveOrigin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    placeContent(value: Property.PlaceContent, willSet=true) { return this }

    @RUIStyleProp
    pointerEvents(value: Property.PointerEvents, willSet=true) { return this }

    @RUIStyleProp
    position(value: Property.Position, willSet=true) { return this }

    @RUIStyleProp
    printColorAdjust(value: Property.PrintColorAdjust, willSet=true) { return this }

    @RUIStyleProp
    quotes(value: Property.Quotes, willSet=true) { return this }

    @RUIStyleProp
    resize(value: Property.Resize, willSet=true) { return this }

    @RUIStyleProp
    right(value: Property.Right<TLength>, willSet=true) { return this }

    @RUIStyleProp
    rotate(value: Property.Rotate, willSet=true) { return this }

    @RUIStyleProp
    rowGap(value: Property.RowGap<TLength>, willSet=true) { return this }

    @RUIStyleProp
    rubyAlign(value: Property.RubyAlign, willSet=true) { return this }

    @RUIStyleProp
    rubyMerge(value: Property.RubyMerge, willSet=true) { return this }

    @RUIStyleProp
    rubyPosition(value: Property.RubyPosition, willSet=true) { return this }

    @RUIStyleProp
    scale(value: Property.Scale, willSet=true) { return this }

    @RUIStyleProp
    scrollBehavior(value: Property.ScrollBehavior, willSet=true) { return this }

    @RUIStyleProp
    scrollMargin(value: Property.ScrollMargin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginBlock(value: Property.ScrollMarginBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginBlockEnd(value: Property.ScrollMarginBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginBlockStart(value: Property.ScrollMarginBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginBottom(value: Property.ScrollMarginBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginInline(value: Property.ScrollMarginInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginInlineEnd(value: Property.ScrollMarginInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginInlineStart(value: Property.ScrollMarginInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginLeft(value: Property.ScrollMarginLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginRight(value: Property.ScrollMarginRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollMarginTop(value: Property.ScrollMarginTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPadding(value: Property.ScrollPadding<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingBlock(value: Property.ScrollPaddingBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingBlockEnd(value: Property.ScrollPaddingBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingBlockStart(value: Property.ScrollPaddingBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingBottom(value: Property.ScrollPaddingBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingInline(value: Property.ScrollPaddingInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingInlineEnd(value: Property.ScrollPaddingInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingInlineStart(value: Property.ScrollPaddingInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingLeft(value: Property.ScrollPaddingLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingRight(value: Property.ScrollPaddingRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollPaddingTop(value: Property.ScrollPaddingTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapAlign(value: Property.ScrollSnapAlign, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapMargin(value: Property.ScrollMargin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapMarginBottom(value: Property.ScrollMarginBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapMarginLeft(value: Property.ScrollMarginLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapMarginRight(value: Property.ScrollMarginRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapMarginTop(value: Property.ScrollMarginTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapStop(value: Property.ScrollSnapStop, willSet=true) { return this }

    @RUIStyleProp
    scrollSnapType(value: Property.ScrollSnapType, willSet=true) { return this }

    @RUIStyleProp
    scrollbarColor(value: Property.ScrollbarColor, willSet=true) { return this }

    @RUIStyleProp
    scrollbarGutter(value: Property.ScrollbarGutter, willSet=true) { return this }

    @RUIStyleProp
    scrollbarWidth(value: Property.ScrollbarWidth, willSet=true) { return this }

    @RUIStyleProp
    shapeImageThreshold(value: Property.ShapeImageThreshold, willSet=true) { return this }

    @RUIStyleProp
    shapeMargin(value: Property.ShapeMargin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    shapeOutside(value: Property.ShapeOutside, willSet=true) { return this }

    @RUIStyleProp
    tabSize(value: Property.TabSize<TLength>, willSet=true) { return this }

    @RUIStyleProp
    tableLayout(value: Property.TableLayout, willSet=true) { return this }

    @RUIStyleProp
    textAlign(value: Property.TextAlign, willSet=true) { return this }

    @RUIStyleProp
    textAlignLast(value: Property.TextAlignLast, willSet=true) { return this }

    @RUIStyleProp
    textCombineUpright(value: Property.TextCombineUpright, willSet=true) { return this }

    @RUIStyleProp
    textDecorationColor(value: Property.TextDecorationColor, willSet=true) { return this }

    @RUIStyleProp
    textDecorationLine(value: Property.TextDecorationLine, willSet=true) { return this }

    @RUIStyleProp
    textDecorationSkip(value: Property.TextDecorationSkip, willSet=true) { return this }

    @RUIStyleProp
    textDecorationSkipInk(value: Property.TextDecorationSkipInk, willSet=true) { return this }

    @RUIStyleProp
    textDecorationStyle(value: Property.TextDecorationStyle, willSet=true) { return this }

    @RUIStyleProp
    textDecorationThickness(value: Property.TextDecorationThickness<TLength>, willSet=true) { return this }

    @RUIStyleProp
    textDecorationWidth(value: Property.TextDecorationThickness<TLength>, willSet=true) { return this }

    @RUIStyleProp
    textEmphasisColor(value: Property.TextEmphasisColor, willSet=true) { return this }

    @RUIStyleProp
    textEmphasisPosition(value: Property.TextEmphasisPosition, willSet=true) { return this }

    @RUIStyleProp
    textEmphasisStyle(value: Property.TextEmphasisStyle, willSet=true) { return this }

    @RUIStyleProp
    textIndent(value: Property.TextIndent<TLength>, willSet=true) { return this }

    @RUIStyleProp
    textJustify(value: Property.TextJustify, willSet=true) { return this }

    @RUIStyleProp
    textOrientation(value: Property.TextOrientation, willSet=true) { return this }

    @RUIStyleProp
    textOverflow(value: Property.TextOverflow, willSet=true) { return this }

    @RUIStyleProp
    textRendering(value: Property.TextRendering, willSet=true) { return this }

    @RUIStyleProp
    textShadow(value: Property.TextShadow, willSet=true) { return this }

    @RUIStyleProp
    textSizeAdjust(value: Property.TextSizeAdjust, willSet=true) { return this }

    @RUIStyleProp
    textTransform(value: Property.TextTransform, willSet=true) { return this }

    @RUIStyleProp
    textUnderlineOffset(value: Property.TextUnderlineOffset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    textUnderlinePosition(value: Property.TextUnderlinePosition, willSet=true) { return this }

    @RUIStyleProp
    top(value: Property.Top<TLength>, willSet=true) { return this }

    @RUIStyleProp
    touchAction(value: Property.TouchAction, willSet=true) { return this }

    @RUIStyleProp
    transform(value: Property.Transform, willSet=true) { return this }

    @RUIStyleProp
    transformBox(value: Property.TransformBox, willSet=true) { return this }

    @RUIStyleProp
    transformOrigin(value: Property.TransformOrigin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    transformStyle(value: Property.TransformStyle, willSet=true) { return this }

    @RUIStyleProp
    transitionDelay(value: Property.TransitionDelay<TTime>, willSet=true) { return this }

    @RUIStyleProp
    transitionDuration(value: Property.TransitionDuration<TTime>, willSet=true) { return this }

    @RUIStyleProp
    transitionProperty(value: Property.TransitionProperty, willSet=true) { return this }

    @RUIStyleProp
    transitionTimingFunction(value: Property.TransitionTimingFunction, willSet=true) { return this }

    @RUIStyleProp
    translate(value: Property.Translate<TLength>, willSet=true) { return this }

    @RUIStyleProp
    unicodeBidi(value: Property.UnicodeBidi, willSet=true) { return this }

    @RUIStyleProp
    userSelect(value: Property.UserSelect, willSet=true) { return this }

    @RUIStyleProp
    verticalAlign(value: Property.VerticalAlign<TLength>, willSet=true) { return this }

    @RUIStyleProp
    visibility(value: Property.Visibility, willSet=true) { return this }

    @RUIStyleProp
    whiteSpace(value: Property.WhiteSpace, willSet=true) { return this }

    @RUIStyleProp
    widows(value: Property.Widows, willSet=true) { return this }

    @RUIStyleProp
    width(value: Property.Width<TLength>, willSet=true) { return this }

    @RUIStyleProp
    willChange(value: Property.WillChange, willSet=true) { return this }

    @RUIStyleProp
    wordBreak(value: Property.WordBreak, willSet=true) { return this }

    @RUIStyleProp
    wordSpacing(value: Property.WordSpacing<TLength>, willSet=true) { return this }

    @RUIStyleProp
    wordWrap(value: Property.WordWrap, willSet=true) { return this }

    @RUIStyleProp
    writingMode(value: Property.WritingMode, willSet=true) { return this }

    @RUIStyleProp
    zIndex(value: Property.ZIndex, willSet=true) { return this }

    @RUIStyleProp
    zoom(value: Property.Zoom, willSet=true) { return this }

    @RUIStyleProp
    all(value: Property.All, willSet=true) { return this }

    @RUIStyleProp
    animation(value: Property.Animation<TTime>, willSet=true) { return this }

    @RUIStyleProp
    background(value: Property.Background<TLength>, willSet=true) { return this }

    @RUIStyleProp
    backgroundPosition(value: Property.BackgroundPosition<TLength>, willSet=true) { return this }

    @RUIStyleProp
    border(value: Property.Border<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlock(value: Property.BorderBlock<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlockEnd(value: Property.BorderBlockEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBlockStart(value: Property.BorderBlockStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderBottom(value: Property.BorderBottom<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderColor(value: Property.BorderColor, willSet=true) { return this }

    @RUIStyleProp
    borderImage(value: Property.BorderImage, willSet=true) { return this }

    @RUIStyleProp
    borderInline(value: Property.BorderInline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderInlineEnd(value: Property.BorderInlineEnd<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderInlineStart(value: Property.BorderInlineStart<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderLeft(value: Property.BorderLeft<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderRadius(value: Property.BorderRadius<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderRight(value: Property.BorderRight<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderStyle(value: Property.BorderStyle, willSet=true) { return this }

    @RUIStyleProp
    borderTop(value: Property.BorderTop<TLength>, willSet=true) { return this }

    @RUIStyleProp
    borderWidth(value: Property.BorderWidth<TLength>, willSet=true) { return this }

    @RUIStyleProp
    columnRule(value: Property.ColumnRule<TLength>, willSet=true) { return this }

    @RUIStyleProp
    columns(value: Property.Columns<TLength>, willSet=true) { return this }

    @RUIStyleProp
    flex(value: Property.Flex<TLength>, willSet=true) { return this }

    @RUIStyleProp
    flexFlow(value: Property.FlexFlow, willSet=true) { return this }

    @RUIStyleProp
    font(value: Property.Font, willSet=true) { return this }

    @RUIStyleProp
    gap(value: Property.Gap<TLength>, willSet=true) { return this }

    @RUIStyleProp
    grid(value: Property.Grid, willSet=true) { return this }

    @RUIStyleProp
    gridArea(value: Property.GridArea, willSet=true) { return this }

    @RUIStyleProp
    gridColumn(value: Property.GridColumn, willSet=true) { return this }

    @RUIStyleProp
    gridRow(value: Property.GridRow, willSet=true) { return this }

    @RUIStyleProp
    gridTemplate(value: Property.GridTemplate, willSet=true) { return this }

    @RUIStyleProp
    lineClamp(value: Property.LineClamp, willSet=true) { return this }

    @RUIStyleProp
    listStyle(value: Property.ListStyle, willSet=true) { return this }

    @RUIStyleProp
    margin(value: Property.Margin<TLength>, willSet=true) { return this }

    @RUIStyleProp
    mask(value: Property.Mask<TLength>, willSet=true) { return this }

    @RUIStyleProp
    maskBorder(value: Property.MaskBorder, willSet=true) { return this }

    @RUIStyleProp
    motion(value: Property.Offset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    offset(value: Property.Offset<TLength>, willSet=true) { return this }

    @RUIStyleProp
    outline(value: Property.Outline<TLength>, willSet=true) { return this }

    @RUIStyleProp
    overflow(value: Property.Overflow, willSet=true) { return this }

    @RUIStyleProp
    overscrollBehavior(value: Property.OverscrollBehavior, willSet=true) { return this }

    @RUIStyleProp
    padding(value: Property.Padding<TLength>, willSet=true) { return this }

    @RUIStyleProp
    placeItems(value: Property.PlaceItems, willSet=true) { return this }

    @RUIStyleProp
    placeSelf(value: Property.PlaceSelf, willSet=true) { return this }

    @RUIStyleProp
    textDecoration(value: Property.TextDecoration<TLength>, willSet=true) { return this }

    @RUIStyleProp
    textEmphasis(value: Property.TextEmphasis, willSet=true) { return this }

    @RUIStyleProp
    transition(value: Property.Transition<TTime>, willSet=true) { return this }

}
