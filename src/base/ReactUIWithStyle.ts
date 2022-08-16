import {
    AnimationEventHandler,
    ClipboardEventHandler,
    CompositionEventHandler, CSSProperties, DOMAttributes, DragEventHandler,
    FocusEventHandler,
    FormEventHandler, KeyboardEventHandler, MouseEventHandler, PointerEventHandler,
    ReactEventHandler, TouchEventHandler, TransitionEventHandler, UIEventHandler, WheelEventHandler
} from "react";
import {Property} from "csstype";
import ReactUIBase from "./ReactUIBase";

export default class ReactUIWithStyle<TLength = (string & {}) | 0, TTime = string & {}> extends ReactUIBase {
    // ---* Events from react/ReactUIHH.d.tx -> DOMAttributes
    // ---- Clipboard Events
    onCopy(value: ClipboardEventHandler) {
        this.elementProps.onCopy = value
        return this
    }

    onCopyCapture(value: ClipboardEventHandler) {
        this.elementProps.onCopyCapture = value
        return this
    }

    onCut(value: ClipboardEventHandler) {
        this.elementProps.onCut = value
        return this
    }

    onCutCapture(value: ClipboardEventHandler) {
        this.elementProps.onCutCapture = value
        return this
    }

    onPaste(value: ClipboardEventHandler) {
        this.elementProps.onPaste = value
        return this
    }

    onPasteCapture(value: ClipboardEventHandler) {
        this.elementProps.onPasteCapture = value
        return this
    }

    // ---- Composition Events
    onCompositionEnd(value: CompositionEventHandler) {
        this.elementProps.onCompositionEnd = value
        return this
    }

    onCompositionEndCapture(value: CompositionEventHandler) {
        this.elementProps.onCompositionEndCapture = value
        return this
    }

    onCompositionStart(value: CompositionEventHandler) {
        this.elementProps.onCompositionStart = value
        return this
    }

    onCompositionStartCapture(value: CompositionEventHandler) {
        this.elementProps.onCompositionStartCapture = value
        return this
    }

    onCompositionUpdate(value: CompositionEventHandler) {
        this.elementProps.onCompositionUpdate = value
        return this
    }

    onCompositionUpdateCapture(value: CompositionEventHandler) {
        this.elementProps.onCompositionUpdateCapture = value
        return this
    }

    // ---- Focus Events
    onFocus(value: FocusEventHandler) {
        this.elementProps.onFocus = value
        return this
    }

    onFocusCapture(value: FocusEventHandler) {
        this.elementProps.onFocusCapture = value
        return this
    }

    onBlur(value: FocusEventHandler) {
        this.elementProps.onBlur = value
        return this
    }

    onBlurCapture(value: FocusEventHandler) {
        this.elementProps.onBlurCapture = value
        return this
    }

    // ---- Form Events
    onChange(value: FormEventHandler) {
        this.elementProps.onChange = value
        return this
    }

    onChangeCapture(value: FormEventHandler) {
        this.elementProps.onChangeCapture = value
        return this
    }

    onBeforeInput(value: FormEventHandler) {
        this.elementProps.onBeforeInput = value
        return this
    }

    onBeforeInputCapture(value: FormEventHandler) {
        this.elementProps.onBeforeInputCapture = value
        return this
    }

    onInput(value: FormEventHandler) {
        this.elementProps.onInput = value
        return this
    }

    onInputCapture(value: FormEventHandler) {
        this.elementProps.onInputCapture = value
        return this
    }

    onReset(value: FormEventHandler) {
        this.elementProps.onReset = value
        return this
    }

    onResetCapture(value: FormEventHandler) {
        this.elementProps.onResetCapture = value
        return this
    }

    onSubmit(value: FormEventHandler) {
        this.elementProps.onSubmit = value
        return this
    }

    onSubmitCapture(value: FormEventHandler) {
        this.elementProps.onSubmitCapture = value
        return this
    }

    onInvalid(value: FormEventHandler) {
        this.elementProps.onInvalid = value
        return this
    }

    onInvalidCapture(value: FormEventHandler) {
        this.elementProps.onInvalidCapture = value
        return this
    }

    // ---- Image Events
    onLoad(value: ReactEventHandler) {
        this.elementProps.onLoad = value
        return this
    }

    onLoadCapture(value: ReactEventHandler) {
        this.elementProps.onLoadCapture = value
        return this
    }

    onError(value: ReactEventHandler) {
        this.elementProps.onError = value
        return this
    }

    // ---- also a Media Event
    onErrorCapture(value: ReactEventHandler) {
        this.elementProps.onErrorCapture = value
        return this
    }

    // ---- also a Media Event
    // ---- Keyboard Events
    onKeyDown(value: KeyboardEventHandler) {
        this.elementProps.onKeyDown = value
        return this
    }

    onKeyDownCapture(value: KeyboardEventHandler) {
        this.elementProps.onKeyDownCapture = value
        return this
    }

    onKeyPress(value: KeyboardEventHandler) {
        this.elementProps.onKeyPress = value
        return this
    }

    onKeyPressCapture(value: KeyboardEventHandler) {
        this.elementProps.onKeyPressCapture = value
        return this
    }

    onKeyUp(value: KeyboardEventHandler) {
        this.elementProps.onKeyUp = value
        return this
    }

    onKeyUpCapture(value: KeyboardEventHandler) {
        this.elementProps.onKeyUpCapture = value
        return this
    }

    // ---- Media Events
    onAbort(value: ReactEventHandler) {
        this.elementProps.onAbort = value
        return this
    }

    onAbortCapture(value: ReactEventHandler) {
        this.elementProps.onAbortCapture = value
        return this
    }

    onCanPlay(value: ReactEventHandler) {
        this.elementProps.onCanPlay = value
        return this
    }

    onCanPlayCapture(value: ReactEventHandler) {
        this.elementProps.onCanPlayCapture = value
        return this
    }

    onCanPlayThrough(value: ReactEventHandler) {
        this.elementProps.onCanPlayThrough = value
        return this
    }

    onCanPlayThroughCapture(value: ReactEventHandler) {
        this.elementProps.onCanPlayThroughCapture = value
        return this
    }

    onDurationChange(value: ReactEventHandler) {
        this.elementProps.onDurationChange = value
        return this
    }

    onDurationChangeCapture(value: ReactEventHandler) {
        this.elementProps.onDurationChangeCapture = value
        return this
    }

    onEmptied(value: ReactEventHandler) {
        this.elementProps.onEmptied = value
        return this
    }

    onEmptiedCapture(value: ReactEventHandler) {
        this.elementProps.onEmptiedCapture = value
        return this
    }

    onEncrypted(value: ReactEventHandler) {
        this.elementProps.onEncrypted = value
        return this
    }

    onEncryptedCapture(value: ReactEventHandler) {
        this.elementProps.onEncryptedCapture = value
        return this
    }

    onEnded(value: ReactEventHandler) {
        this.elementProps.onEnded = value
        return this
    }

    onEndedCapture(value: ReactEventHandler) {
        this.elementProps.onEndedCapture = value
        return this
    }

    onLoadedData(value: ReactEventHandler) {
        this.elementProps.onLoadedData = value
        return this
    }

    onLoadedDataCapture(value: ReactEventHandler) {
        this.elementProps.onLoadedDataCapture = value
        return this
    }

    onLoadedMetadata(value: ReactEventHandler) {
        this.elementProps.onLoadedMetadata = value
        return this
    }

    onLoadedMetadataCapture(value: ReactEventHandler) {
        this.elementProps.onLoadedMetadataCapture = value
        return this
    }

    onLoadStart(value: ReactEventHandler) {
        this.elementProps.onLoadStart = value
        return this
    }

    onLoadStartCapture(value: ReactEventHandler) {
        this.elementProps.onLoadStartCapture = value
        return this
    }

    onPause(value: ReactEventHandler) {
        this.elementProps.onPause = value
        return this
    }

    onPauseCapture(value: ReactEventHandler) {
        this.elementProps.onPauseCapture = value
        return this
    }

    onPlay(value: ReactEventHandler) {
        this.elementProps.onPlay = value
        return this
    }

    onPlayCapture(value: ReactEventHandler) {
        this.elementProps.onPlayCapture = value
        return this
    }

    onPlaying(value: ReactEventHandler) {
        this.elementProps.onPlaying = value
        return this
    }

    onPlayingCapture(value: ReactEventHandler) {
        this.elementProps.onPlayingCapture = value
        return this
    }

    onProgress(value: ReactEventHandler) {
        this.elementProps.onProgress = value
        return this
    }

    onProgressCapture(value: ReactEventHandler) {
        this.elementProps.onProgressCapture = value
        return this
    }

    onRateChange(value: ReactEventHandler) {
        this.elementProps.onRateChange = value
        return this
    }

    onRateChangeCapture(value: ReactEventHandler) {
        this.elementProps.onRateChangeCapture = value
        return this
    }

    onSeeked(value: ReactEventHandler) {
        this.elementProps.onSeeked = value
        return this
    }

    onSeekedCapture(value: ReactEventHandler) {
        this.elementProps.onSeekedCapture = value
        return this
    }

    onSeeking(value: ReactEventHandler) {
        this.elementProps.onSeeking = value
        return this
    }

    onSeekingCapture(value: ReactEventHandler) {
        this.elementProps.onSeekingCapture = value
        return this
    }

    onStalled(value: ReactEventHandler) {
        this.elementProps.onStalled = value
        return this
    }

    onStalledCapture(value: ReactEventHandler) {
        this.elementProps.onStalledCapture = value
        return this
    }

    onSuspend(value: ReactEventHandler) {
        this.elementProps.onSuspend = value
        return this
    }

    onSuspendCapture(value: ReactEventHandler) {
        this.elementProps.onSuspendCapture = value
        return this
    }

    onTimeUpdate(value: ReactEventHandler) {
        this.elementProps.onTimeUpdate = value
        return this
    }

    onTimeUpdateCapture(value: ReactEventHandler) {
        this.elementProps.onTimeUpdateCapture = value
        return this
    }

    onVolumeChange(value: ReactEventHandler) {
        this.elementProps.onVolumeChange = value
        return this
    }

    onVolumeChangeCapture(value: ReactEventHandler) {
        this.elementProps.onVolumeChangeCapture = value
        return this
    }

    onWaiting(value: ReactEventHandler) {
        this.elementProps.onWaiting = value
        return this
    }

    onWaitingCapture(value: ReactEventHandler) {
        this.elementProps.onWaitingCapture = value
        return this
    }

    // ---- MouseEvents
    onAuxClick(value: MouseEventHandler) {
        this.elementProps.onAuxClick = value
        return this
    }

    onAuxClickCapture(value: MouseEventHandler) {
        this.elementProps.onAuxClickCapture = value
        return this
    }

    onClick(value: MouseEventHandler) {
        this.elementProps.onClick = value
        return this
    }

    onClickCapture(value: MouseEventHandler) {
        this.elementProps.onClickCapture = value
        return this
    }

    onContextMenu(value: MouseEventHandler) {
        this.elementProps.onContextMenu = value
        return this
    }

    onContextMenuCapture(value: MouseEventHandler) {
        this.elementProps.onContextMenuCapture = value
        return this
    }

    onDoubleClick(value: MouseEventHandler) {
        this.elementProps.onDoubleClick = value
        return this
    }

    onDoubleClickCapture(value: MouseEventHandler) {
        this.elementProps.onDoubleClickCapture = value
        return this
    }

    onDrag(value: DragEventHandler) {
        this.elementProps.onDrag = value
        return this
    }

    onDragCapture(value: DragEventHandler) {
        this.elementProps.onDragCapture = value
        return this
    }

    onDragEnd(value: DragEventHandler) {
        this.elementProps.onDragEnd = value
        return this
    }

    onDragEndCapture(value: DragEventHandler) {
        this.elementProps.onDragEndCapture = value
        return this
    }

    onDragEnter(value: DragEventHandler) {
        this.elementProps.onDragEnter = value
        return this
    }

    onDragEnterCapture(value: DragEventHandler) {
        this.elementProps.onDragEnterCapture = value
        return this
    }

    onDragExit(value: DragEventHandler) {
        this.elementProps.onDragExit = value
        return this
    }

    onDragExitCapture(value: DragEventHandler) {
        this.elementProps.onDragExitCapture = value
        return this
    }

    onDragLeave(value: DragEventHandler) {
        this.elementProps.onDragLeave = value
        return this
    }

    onDragLeaveCapture(value: DragEventHandler) {
        this.elementProps.onDragLeaveCapture = value
        return this
    }

    onDragOver(value: DragEventHandler) {
        this.elementProps.onDragOver = value
        return this
    }

    onDragOverCapture(value: DragEventHandler) {
        this.elementProps.onDragOverCapture = value
        return this
    }

    onDragStart(value: DragEventHandler) {
        this.elementProps.onDragStart = value
        return this
    }

    onDragStartCapture(value: DragEventHandler) {
        this.elementProps.onDragStartCapture = value
        return this
    }

    onDrop(value: DragEventHandler) {
        this.elementProps.onDrop = value
        return this
    }

    onDropCapture(value: DragEventHandler) {
        this.elementProps.onDropCapture = value
        return this
    }

    onMouseDown(value: MouseEventHandler) {
        this.elementProps.onMouseDown = value
        return this
    }

    onMouseDownCapture(value: MouseEventHandler) {
        this.elementProps.onMouseDownCapture = value
        return this
    }

    onMouseEnter(value: MouseEventHandler) {
        this.elementProps.onMouseEnter = value
        return this
    }

    onMouseLeave(value: MouseEventHandler) {
        this.elementProps.onMouseLeave = value
        return this
    }

    onMouseMove(value: MouseEventHandler) {
        this.elementProps.onMouseMove = value
        return this
    }

    onMouseMoveCapture(value: MouseEventHandler) {
        this.elementProps.onMouseMoveCapture = value
        return this
    }

    onMouseOut(value: MouseEventHandler) {
        this.elementProps.onMouseOut = value
        return this
    }

    onMouseOutCapture(value: MouseEventHandler) {
        this.elementProps.onMouseOutCapture = value
        return this
    }

    onMouseOver(value: MouseEventHandler) {
        this.elementProps.onMouseOver = value
        return this
    }

    onMouseOverCapture(value: MouseEventHandler) {
        this.elementProps.onMouseOverCapture = value
        return this
    }

    onMouseUp(value: MouseEventHandler) {
        this.elementProps.onMouseUp = value
        return this
    }

    onMouseUpCapture(value: MouseEventHandler) {
        this.elementProps.onMouseUpCapture = value
        return this
    }

    // ---- Selection Events
    onSelect(value: ReactEventHandler) {
        this.elementProps.onSelect = value
        return this
    }

    onSelectCapture(value: ReactEventHandler) {
        this.elementProps.onSelectCapture = value
        return this
    }

    // ---- Touch Events
    onTouchCancel(value: TouchEventHandler) {
        this.elementProps.onTouchCancel = value
        return this
    }

    onTouchCancelCapture(value: TouchEventHandler) {
        this.elementProps.onTouchCancelCapture = value
        return this
    }

    onTouchEnd(value: TouchEventHandler) {
        this.elementProps.onTouchEnd = value
        return this
    }

    onTouchEndCapture(value: TouchEventHandler) {
        this.elementProps.onTouchEndCapture = value
        return this
    }

    onTouchMove(value: TouchEventHandler) {
        this.elementProps.onTouchMove = value
        return this
    }

    onTouchMoveCapture(value: TouchEventHandler) {
        this.elementProps.onTouchMoveCapture = value
        return this
    }

    onTouchStart(value: TouchEventHandler) {
        this.elementProps.onTouchStart = value
        return this
    }

    onTouchStartCapture(value: TouchEventHandler) {
        this.elementProps.onTouchStartCapture = value
        return this
    }

    // ---- Pointer Events
    onPointerDown(value: PointerEventHandler) {
        this.elementProps.onPointerDown = value
        return this
    }

    onPointerDownCapture(value: PointerEventHandler) {
        this.elementProps.onPointerDownCapture = value
        return this
    }

    onPointerMove(value: PointerEventHandler) {
        this.elementProps.onPointerMove = value
        return this
    }

    onPointerMoveCapture(value: PointerEventHandler) {
        this.elementProps.onPointerMoveCapture = value
        return this
    }

    onPointerUp(value: PointerEventHandler) {
        this.elementProps.onPointerUp = value
        return this
    }

    onPointerUpCapture(value: PointerEventHandler) {
        this.elementProps.onPointerUpCapture = value
        return this
    }

    onPointerCancel(value: PointerEventHandler) {
        this.elementProps.onPointerCancel = value
        return this
    }

    onPointerCancelCapture(value: PointerEventHandler) {
        this.elementProps.onPointerCancelCapture = value
        return this
    }

    onPointerEnter(value: PointerEventHandler) {
        this.elementProps.onPointerEnter = value
        return this
    }

    onPointerEnterCapture(value: PointerEventHandler) {
        this.elementProps.onPointerEnterCapture = value
        return this
    }

    onPointerLeave(value: PointerEventHandler) {
        this.elementProps.onPointerLeave = value
        return this
    }

    onPointerLeaveCapture(value: PointerEventHandler) {
        this.elementProps.onPointerLeaveCapture = value
        return this
    }

    onPointerOver(value: PointerEventHandler) {
        this.elementProps.onPointerOver = value
        return this
    }

    onPointerOverCapture(value: PointerEventHandler) {
        this.elementProps.onPointerOverCapture = value
        return this
    }

    onPointerOut(value: PointerEventHandler) {
        this.elementProps.onPointerOut = value
        return this
    }

    onPointerOutCapture(value: PointerEventHandler) {
        this.elementProps.onPointerOutCapture = value
        return this
    }

    onGotPointerCapture(value: PointerEventHandler) {
        this.elementProps.onGotPointerCapture = value
        return this
    }

    onGotPointerCaptureCapture(value: PointerEventHandler) {
        this.elementProps.onGotPointerCaptureCapture = value
        return this
    }

    onLostPointerCapture(value: PointerEventHandler) {
        this.elementProps.onLostPointerCapture = value
        return this
    }

    onLostPointerCaptureCapture(value: PointerEventHandler) {
        this.elementProps.onLostPointerCaptureCapture = value
        return this
    }

    // ---- UI Events
    onScroll(value: UIEventHandler) {
        this.elementProps.onScroll = value
        return this
    }

    onScrollCapture(value: UIEventHandler) {
        this.elementProps.onScrollCapture = value
        return this
    }

    // ---- Wheel Events
    onWheel(value: WheelEventHandler) {
        this.elementProps.onWheel = value
        return this
    }

    onWheelCapture(value: WheelEventHandler) {
        this.elementProps.onWheelCapture = value
        return this
    }

    // ---- Animation Events
    onAnimationStart(value: AnimationEventHandler) {
        this.elementProps.onAnimationStart = value
        return this
    }

    onAnimationStartCapture(value: AnimationEventHandler) {
        this.elementProps.onAnimationStartCapture = value
        return this
    }

    onAnimationEnd(value: AnimationEventHandler) {
        this.elementProps.onAnimationEnd = value
        return this
    }

    onAnimationEndCapture(value: AnimationEventHandler) {
        this.elementProps.onAnimationEndCapture = value
        return this
    }

    onAnimationIteration(value: AnimationEventHandler) {
        this.elementProps.onAnimationIteration = value
        return this
    }

    onAnimationIterationCapture(value: AnimationEventHandler) {
        this.elementProps.onAnimationIterationCapture = value
        return this
    }

    // ---- Transition Events
    onTransitionEnd(value: TransitionEventHandler) {
        this.elementProps.onTransitionEnd = value
        return this
    }

    onTransitionEndCapture(value: TransitionEventHandler) {
        this.elementProps.onTransitionEndCapture = value
        return this
    }

    // ---* All styles from csstype/ReactUIHH.d.ts
    accentColor(value: Property.AccentColor) {
        this.elementProps.style.accentColor = value
        return this
    }

    alignContent(value: Property.AlignContent) {
        this.elementProps.style.alignContent = value
        return this
    }

    alignItems(value: Property.AlignItems) {
        this.elementProps.style.alignItems = value
        return this
    }

    alignSelf(value: Property.AlignSelf) {
        this.elementProps.style.alignSelf = value
        return this
    }

    alignTracks(value: Property.AlignTracks) {
        this.elementProps.style.alignTracks = value
        return this
    }

    animationDelay(value: Property.AnimationDelay<TTime>) {
        this.elementProps.style.animationDelay = value
        return this
    }

    animationDirection(value: Property.AnimationDirection) {
        this.elementProps.style.animationDirection = value
        return this
    }

    animationDuration(value: Property.AnimationDuration<TTime>) {
        this.elementProps.style.animationDuration = value
        return this
    }

    animationFillMode(value: Property.AnimationFillMode) {
        this.elementProps.style.animationFillMode = value
        return this
    }

    animationIterationCount(value: Property.AnimationIterationCount) {
        this.elementProps.style.animationIterationCount = value
        return this
    }

    animationName(value: Property.AnimationName) {
        this.elementProps.style.animationName = value
        return this
    }

    animationPlayState(value: Property.AnimationPlayState) {
        this.elementProps.style.animationPlayState = value
        return this
    }

    animationTimeline(value: Property.AnimationTimeline) {
        this.elementProps.style.animationTimeline = value
        return this
    }

    animationTimingFunction(value: Property.AnimationTimingFunction) {
        this.elementProps.style.animationTimingFunction = value
        return this
    }

    appearance(value: Property.Appearance) {
        this.elementProps.style.appearance = value
        return this
    }

    aspectRatio(value: Property.AspectRatio) {
        this.elementProps.style.aspectRatio = value
        return this
    }

    backdropFilter(value: Property.BackdropFilter) {
        this.elementProps.style.backdropFilter = value
        return this
    }

    backfaceVisibility(value: Property.BackfaceVisibility) {
        this.elementProps.style.backfaceVisibility = value
        return this
    }

    backgroundAttachment(value: Property.BackgroundAttachment) {
        this.elementProps.style.backgroundAttachment = value
        return this
    }

    backgroundBlendMode(value: Property.BackgroundBlendMode) {
        this.elementProps.style.backgroundBlendMode = value
        return this
    }

    backgroundClip(value: Property.BackgroundClip) {
        this.elementProps.style.backgroundClip = value
        return this
    }

    backgroundColor(value: Property.BackgroundColor) {
        this.elementProps.style.backgroundColor = value
        return this
    }

    backgroundImage(value: Property.BackgroundImage) {
        this.elementProps.style.backgroundImage = value
        return this
    }

    backgroundOrigin(value: Property.BackgroundOrigin) {
        this.elementProps.style.backgroundOrigin = value
        return this
    }

    backgroundPositionX(value: Property.BackgroundPositionX<TLength>) {
        this.elementProps.style.backgroundPositionX = value
        return this
    }

    backgroundPositionY(value: Property.BackgroundPositionY<TLength>) {
        this.elementProps.style.backgroundPositionY = value
        return this
    }

    backgroundRepeat(value: Property.BackgroundRepeat) {
        this.elementProps.style.backgroundRepeat = value
        return this
    }

    backgroundSize(value: Property.BackgroundSize<TLength>) {
        this.elementProps.style.backgroundSize = value
        return this
    }

    blockOverflow(value: Property.BlockOverflow) {
        this.elementProps.style.blockOverflow = value
        return this
    }

    blockSize(value: Property.BlockSize<TLength>) {
        this.elementProps.style.blockSize = value
        return this
    }

    borderBlockColor(value: Property.BorderBlockColor) {
        this.elementProps.style.borderBlockColor = value
        return this
    }

    borderBlockEndColor(value: Property.BorderBlockEndColor) {
        this.elementProps.style.borderBlockEndColor = value
        return this
    }

    borderBlockEndStyle(value: Property.BorderBlockEndStyle) {
        this.elementProps.style.borderBlockEndStyle = value
        return this
    }

    borderBlockEndWidth(value: Property.BorderBlockEndWidth<TLength>) {
        this.elementProps.style.borderBlockEndWidth = value
        return this
    }

    borderBlockStartColor(value: Property.BorderBlockStartColor) {
        this.elementProps.style.borderBlockStartColor = value
        return this
    }

    borderBlockStartStyle(value: Property.BorderBlockStartStyle) {
        this.elementProps.style.borderBlockStartStyle = value
        return this
    }

    borderBlockStartWidth(value: Property.BorderBlockStartWidth<TLength>) {
        this.elementProps.style.borderBlockStartWidth = value
        return this
    }

    borderBlockStyle(value: Property.BorderBlockStyle) {
        this.elementProps.style.borderBlockStyle = value
        return this
    }

    borderBlockWidth(value: Property.BorderBlockWidth<TLength>) {
        this.elementProps.style.borderBlockWidth = value
        return this
    }

    borderBottomColor(value: Property.BorderBottomColor) {
        this.elementProps.style.borderBottomColor = value
        return this
    }

    borderBottomLeftRadius(value: Property.BorderBottomLeftRadius<TLength>) {
        this.elementProps.style.borderBottomLeftRadius = value
        return this
    }

    borderBottomRightRadius(value: Property.BorderBottomRightRadius<TLength>) {
        this.elementProps.style.borderBottomRightRadius = value
        return this
    }

    borderBottomStyle(value: Property.BorderBottomStyle) {
        this.elementProps.style.borderBottomStyle = value
        return this
    }

    borderBottomWidth(value: Property.BorderBottomWidth<TLength>) {
        this.elementProps.style.borderBottomWidth = value
        return this
    }

    borderCollapse(value: Property.BorderCollapse) {
        this.elementProps.style.borderCollapse = value
        return this
    }

    borderEndEndRadius(value: Property.BorderEndEndRadius<TLength>) {
        this.elementProps.style.borderEndEndRadius = value
        return this
    }

    borderEndStartRadius(value: Property.BorderEndStartRadius<TLength>) {
        this.elementProps.style.borderEndStartRadius = value
        return this
    }

    borderImageOutset(value: Property.BorderImageOutset<TLength>) {
        this.elementProps.style.borderImageOutset = value
        return this
    }

    borderImageRepeat(value: Property.BorderImageRepeat) {
        this.elementProps.style.borderImageRepeat = value
        return this
    }

    borderImageSlice(value: Property.BorderImageSlice) {
        this.elementProps.style.borderImageSlice = value
        return this
    }

    borderImageSource(value: Property.BorderImageSource) {
        this.elementProps.style.borderImageSource = value
        return this
    }

    borderImageWidth(value: Property.BorderImageWidth<TLength>) {
        this.elementProps.style.borderImageWidth = value
        return this
    }

    borderInlineColor(value: Property.BorderInlineColor) {
        this.elementProps.style.borderInlineColor = value
        return this
    }

    borderInlineEndColor(value: Property.BorderInlineEndColor) {
        this.elementProps.style.borderInlineEndColor = value
        return this
    }

    borderInlineEndStyle(value: Property.BorderInlineEndStyle) {
        this.elementProps.style.borderInlineEndStyle = value
        return this
    }

    borderInlineEndWidth(value: Property.BorderInlineEndWidth<TLength>) {
        this.elementProps.style.borderInlineEndWidth = value
        return this
    }

    borderInlineStartColor(value: Property.BorderInlineStartColor) {
        this.elementProps.style.borderInlineStartColor = value
        return this
    }

    borderInlineStartStyle(value: Property.BorderInlineStartStyle) {
        this.elementProps.style.borderInlineStartStyle = value
        return this
    }

    borderInlineStartWidth(value: Property.BorderInlineStartWidth<TLength>) {
        this.elementProps.style.borderInlineStartWidth = value
        return this
    }

    borderInlineStyle(value: Property.BorderInlineStyle) {
        this.elementProps.style.borderInlineStyle = value
        return this
    }

    borderInlineWidth(value: Property.BorderInlineWidth<TLength>) {
        this.elementProps.style.borderInlineWidth = value
        return this
    }

    borderLeftColor(value: Property.BorderLeftColor) {
        this.elementProps.style.borderLeftColor = value
        return this
    }

    borderLeftStyle(value: Property.BorderLeftStyle) {
        this.elementProps.style.borderLeftStyle = value
        return this
    }

    borderLeftWidth(value: Property.BorderLeftWidth<TLength>) {
        this.elementProps.style.borderLeftWidth = value
        return this
    }

    borderRightColor(value: Property.BorderRightColor) {
        this.elementProps.style.borderRightColor = value
        return this
    }

    borderRightStyle(value: Property.BorderRightStyle) {
        this.elementProps.style.borderRightStyle = value
        return this
    }

    borderRightWidth(value: Property.BorderRightWidth<TLength>) {
        this.elementProps.style.borderRightWidth = value
        return this
    }

    borderSpacing(value: Property.BorderSpacing<TLength>) {
        this.elementProps.style.borderSpacing = value
        return this
    }

    borderStartEndRadius(value: Property.BorderStartEndRadius<TLength>) {
        this.elementProps.style.borderStartEndRadius = value
        return this
    }

    borderStartStartRadius(value: Property.BorderStartStartRadius<TLength>) {
        this.elementProps.style.borderStartStartRadius = value
        return this
    }

    borderTopColor(value: Property.BorderTopColor) {
        this.elementProps.style.borderTopColor = value
        return this
    }

    borderTopLeftRadius(value: Property.BorderTopLeftRadius<TLength>) {
        this.elementProps.style.borderTopLeftRadius = value
        return this
    }

    borderTopRightRadius(value: Property.BorderTopRightRadius<TLength>) {
        this.elementProps.style.borderTopRightRadius = value
        return this
    }

    borderTopStyle(value: Property.BorderTopStyle) {
        this.elementProps.style.borderTopStyle = value
        return this
    }

    borderTopWidth(value: Property.BorderTopWidth<TLength>) {
        this.elementProps.style.borderTopWidth = value
        return this
    }

    bottom(value: Property.Bottom<TLength>) {
        this.elementProps.style.bottom = value
        return this
    }

    boxDecorationBreak(value: Property.BoxDecorationBreak) {
        this.elementProps.style.boxDecorationBreak = value
        return this
    }

    boxShadow(value: Property.BoxShadow) {
        this.elementProps.style.boxShadow = value
        return this
    }

    boxSizing(value: Property.BoxSizing) {
        this.elementProps.style.boxSizing = value
        return this
    }

    breakAfter(value: Property.BreakAfter) {
        this.elementProps.style.breakAfter = value
        return this
    }

    breakBefore(value: Property.BreakBefore) {
        this.elementProps.style.breakBefore = value
        return this
    }

    breakInside(value: Property.BreakInside) {
        this.elementProps.style.breakInside = value
        return this
    }

    captionSide(value: Property.CaptionSide) {
        this.elementProps.style.captionSide = value
        return this
    }

    caretColor(value: Property.CaretColor) {
        this.elementProps.style.caretColor = value
        return this
    }

    clear(value: Property.Clear) {
        this.elementProps.style.clear = value
        return this
    }

    clipPath(value: Property.ClipPath) {
        this.elementProps.style.clipPath = value
        return this
    }

    color(value: Property.Color) {
        this.elementProps.style.color = value
        return this
    }

    colorAdjust(value: Property.PrintColorAdjust) {
        this.elementProps.style.colorAdjust = value
        return this
    }

    colorScheme(value: Property.ColorScheme) {
        this.elementProps.style.colorScheme = value
        return this
    }

    columnCount(value: Property.ColumnCount) {
        this.elementProps.style.columnCount = value
        return this
    }

    columnFill(value: Property.ColumnFill) {
        this.elementProps.style.columnFill = value
        return this
    }

    columnGap(value: Property.ColumnGap<TLength>) {
        this.elementProps.style.columnGap = value
        return this
    }

    columnRuleColor(value: Property.ColumnRuleColor) {
        this.elementProps.style.columnRuleColor = value
        return this
    }

    columnRuleStyle(value: Property.ColumnRuleStyle) {
        this.elementProps.style.columnRuleStyle = value
        return this
    }

    columnRuleWidth(value: Property.ColumnRuleWidth<TLength>) {
        this.elementProps.style.columnRuleWidth = value
        return this
    }

    columnSpan(value: Property.ColumnSpan) {
        this.elementProps.style.columnSpan = value
        return this
    }

    columnWidth(value: Property.ColumnWidth<TLength>) {
        this.elementProps.style.columnWidth = value
        return this
    }

    contain(value: Property.Contain) {
        this.elementProps.style.contain = value
        return this
    }

    content(value: Property.Content) {
        this.elementProps.style.content = value
        return this
    }

    contentVisibility(value: Property.ContentVisibility) {
        this.elementProps.style.contentVisibility = value
        return this
    }

    counterIncrement(value: Property.CounterIncrement) {
        this.elementProps.style.counterIncrement = value
        return this
    }

    counterReset(value: Property.CounterReset) {
        this.elementProps.style.counterReset = value
        return this
    }

    counterSet(value: Property.CounterSet) {
        this.elementProps.style.counterSet = value
        return this
    }

    cursor(value: Property.Cursor) {
        this.elementProps.style.cursor = value
        return this
    }

    direction(value: Property.Direction) {
        this.elementProps.style.direction = value
        return this
    }

    display(value: Property.Display) {
        this.elementProps.style.display = value
        return this
    }

    emptyCells(value: Property.EmptyCells) {
        this.elementProps.style.emptyCells = value
        return this
    }

    filter(value: Property.Filter) {
        this.elementProps.style.filter = value
        return this
    }

    flexBasis(value: Property.FlexBasis<TLength>) {
        this.elementProps.style.flexBasis = value
        return this
    }

    flexDirection(value: Property.FlexDirection) {
        this.elementProps.style.flexDirection = value
        return this
    }

    flexGrow(value: Property.FlexGrow) {
        this.elementProps.style.flexGrow = value
        return this
    }

    flexShrink(value: Property.FlexShrink) {
        this.elementProps.style.flexShrink = value
        return this
    }

    flexWrap(value: Property.FlexWrap) {
        this.elementProps.style.flexWrap = value
        return this
    }

    float(value: Property.Float) {
        this.elementProps.style.float = value
        return this
    }

    fontFamily(value: Property.FontFamily) {
        this.elementProps.style.fontFamily = value
        return this
    }

    fontFeatureSettings(value: Property.FontFeatureSettings) {
        this.elementProps.style.fontFeatureSettings = value
        return this
    }

    fontKerning(value: Property.FontKerning) {
        this.elementProps.style.fontKerning = value
        return this
    }

    fontLanguageOverride(value: Property.FontLanguageOverride) {
        this.elementProps.style.fontLanguageOverride = value
        return this
    }

    fontOpticalSizing(value: Property.FontOpticalSizing) {
        this.elementProps.style.fontOpticalSizing = value
        return this
    }

    fontSize(value: Property.FontSize<TLength>) {
        this.elementProps.style.fontSize = value
        return this
    }

    fontSizeAdjust(value: Property.FontSizeAdjust) {
        this.elementProps.style.fontSizeAdjust = value
        return this
    }

    fontSmooth(value: Property.FontSmooth<TLength>) {
        this.elementProps.style.fontSmooth = value
        return this
    }

    fontStretch(value: Property.FontStretch) {
        this.elementProps.style.fontStretch = value
        return this
    }

    fontStyle(value: Property.FontStyle) {
        this.elementProps.style.fontStyle = value
        return this
    }

    fontSynthesis(value: Property.FontSynthesis) {
        this.elementProps.style.fontSynthesis = value
        return this
    }

    fontVariant(value: Property.FontVariant) {
        this.elementProps.style.fontVariant = value
        return this
    }

    fontVariantAlternates(value: Property.FontVariantAlternates) {
        this.elementProps.style.fontVariantAlternates = value
        return this
    }

    fontVariantCaps(value: Property.FontVariantCaps) {
        this.elementProps.style.fontVariantCaps = value
        return this
    }

    fontVariantEastAsian(value: Property.FontVariantEastAsian) {
        this.elementProps.style.fontVariantEastAsian = value
        return this
    }

    fontVariantLigatures(value: Property.FontVariantLigatures) {
        this.elementProps.style.fontVariantLigatures = value
        return this
    }

    fontVariantNumeric(value: Property.FontVariantNumeric) {
        this.elementProps.style.fontVariantNumeric = value
        return this
    }

    fontVariantPosition(value: Property.FontVariantPosition) {
        this.elementProps.style.fontVariantPosition = value
        return this
    }

    fontVariationSettings(value: Property.FontVariationSettings) {
        this.elementProps.style.fontVariationSettings = value
        return this
    }

    fontWeight(value: Property.FontWeight) {
        this.elementProps.style.fontWeight = value
        return this
    }

    forcedColorAdjust(value: Property.ForcedColorAdjust) {
        this.elementProps.style.forcedColorAdjust = value
        return this
    }

    gridAutoColumns(value: Property.GridAutoColumns<TLength>) {
        this.elementProps.style.gridAutoColumns = value
        return this
    }

    gridAutoFlow(value: Property.GridAutoFlow) {
        this.elementProps.style.gridAutoFlow = value
        return this
    }

    gridAutoRows(value: Property.GridAutoRows<TLength>) {
        this.elementProps.style.gridAutoRows = value
        return this
    }

    gridColumnEnd(value: Property.GridColumnEnd) {
        this.elementProps.style.gridColumnEnd = value
        return this
    }

    gridColumnStart(value: Property.GridColumnStart) {
        this.elementProps.style.gridColumnStart = value
        return this
    }

    gridRowEnd(value: Property.GridRowEnd) {
        this.elementProps.style.gridRowEnd = value
        return this
    }

    gridRowStart(value: Property.GridRowStart) {
        this.elementProps.style.gridRowStart = value
        return this
    }

    gridTemplateAreas(value: Property.GridTemplateAreas) {
        this.elementProps.style.gridTemplateAreas = value
        return this
    }

    gridTemplateColumns(value: Property.GridTemplateColumns<TLength>) {
        this.elementProps.style.gridTemplateColumns = value
        return this
    }

    gridTemplateRows(value: Property.GridTemplateRows<TLength>) {
        this.elementProps.style.gridTemplateRows = value
        return this
    }

    hangingPunctuation(value: Property.HangingPunctuation) {
        this.elementProps.style.hangingPunctuation = value
        return this
    }

    height(value: Property.Height<TLength>) {
        this.elementProps.style.height = value
        return this
    }

    hyphenateCharacter(value: Property.HyphenateCharacter) {
        this.elementProps.style.hyphenateCharacter = value
        return this
    }

    hyphens(value: Property.Hyphens) {
        this.elementProps.style.hyphens = value
        return this
    }

    imageOrientation(value: Property.ImageOrientation) {
        this.elementProps.style.imageOrientation = value
        return this
    }

    imageRendering(value: Property.ImageRendering) {
        this.elementProps.style.imageRendering = value
        return this
    }

    imageResolution(value: Property.ImageResolution) {
        this.elementProps.style.imageResolution = value
        return this
    }

    initialLetter(value: Property.InitialLetter) {
        this.elementProps.style.initialLetter = value
        return this
    }

    inlineSize(value: Property.InlineSize<TLength>) {
        this.elementProps.style.inlineSize = value
        return this
    }

    inputSecurity(value: Property.InputSecurity) {
        this.elementProps.style.inputSecurity = value
        return this
    }

    inset(value: Property.Inset<TLength>) {
        this.elementProps.style.inset = value
        return this
    }

    insetBlock(value: Property.InsetBlock<TLength>) {
        this.elementProps.style.insetBlock = value
        return this
    }

    insetBlockEnd(value: Property.InsetBlockEnd<TLength>) {
        this.elementProps.style.insetBlockEnd = value
        return this
    }

    insetBlockStart(value: Property.InsetBlockStart<TLength>) {
        this.elementProps.style.insetBlockStart = value
        return this
    }

    insetInline(value: Property.InsetInline<TLength>) {
        this.elementProps.style.insetInline = value
        return this
    }

    insetInlineEnd(value: Property.InsetInlineEnd<TLength>) {
        this.elementProps.style.insetInlineEnd = value
        return this
    }

    insetInlineStart(value: Property.InsetInlineStart<TLength>) {
        this.elementProps.style.insetInlineStart = value
        return this
    }

    isolation(value: Property.Isolation) {
        this.elementProps.style.isolation = value
        return this
    }

    justifyContent(value: Property.JustifyContent) {
        this.elementProps.style.justifyContent = value
        return this
    }

    justifyItems(value: Property.JustifyItems) {
        this.elementProps.style.justifyItems = value
        return this
    }

    justifySelf(value: Property.JustifySelf) {
        this.elementProps.style.justifySelf = value
        return this
    }

    justifyTracks(value: Property.JustifyTracks) {
        this.elementProps.style.justifyTracks = value
        return this
    }

    left(value: Property.Left<TLength>) {
        this.elementProps.style.left = value
        return this
    }

    letterSpacing(value: Property.LetterSpacing<TLength>) {
        this.elementProps.style.letterSpacing = value
        return this
    }

    lineBreak(value: Property.LineBreak) {
        this.elementProps.style.lineBreak = value
        return this
    }

    lineHeight(value: Property.LineHeight<TLength>) {
        this.elementProps.style.lineHeight = value
        return this
    }

    lineHeightStep(value: Property.LineHeightStep<TLength>) {
        this.elementProps.style.lineHeightStep = value
        return this
    }

    listStyleImage(value: Property.ListStyleImage) {
        this.elementProps.style.listStyleImage = value
        return this
    }

    listStylePosition(value: Property.ListStylePosition) {
        this.elementProps.style.listStylePosition = value
        return this
    }

    listStyleType(value: Property.ListStyleType) {
        this.elementProps.style.listStyleType = value
        return this
    }

    marginBlock(value: Property.MarginBlock<TLength>) {
        this.elementProps.style.marginBlock = value
        return this
    }

    marginBlockEnd(value: Property.MarginBlockEnd<TLength>) {
        this.elementProps.style.marginBlockEnd = value
        return this
    }

    marginBlockStart(value: Property.MarginBlockStart<TLength>) {
        this.elementProps.style.marginBlockStart = value
        return this
    }

    marginBottom(value: Property.MarginBottom<TLength>) {
        this.elementProps.style.marginBottom = value
        return this
    }

    marginInline(value: Property.MarginInline<TLength>) {
        this.elementProps.style.marginInline = value
        return this
    }

    marginInlineEnd(value: Property.MarginInlineEnd<TLength>) {
        this.elementProps.style.marginInlineEnd = value
        return this
    }

    marginInlineStart(value: Property.MarginInlineStart<TLength>) {
        this.elementProps.style.marginInlineStart = value
        return this
    }

    marginLeft(value: Property.MarginLeft<TLength>) {
        this.elementProps.style.marginLeft = value
        return this
    }

    marginRight(value: Property.MarginRight<TLength>) {
        this.elementProps.style.marginRight = value
        return this
    }

    marginTop(value: Property.MarginTop<TLength>) {
        this.elementProps.style.marginTop = value
        return this
    }

    maskBorderMode(value: Property.MaskBorderMode) {
        this.elementProps.style.maskBorderMode = value
        return this
    }

    maskBorderOutset(value: Property.MaskBorderOutset<TLength>) {
        this.elementProps.style.maskBorderOutset = value
        return this
    }

    maskBorderRepeat(value: Property.MaskBorderRepeat) {
        this.elementProps.style.maskBorderRepeat = value
        return this
    }

    maskBorderSlice(value: Property.MaskBorderSlice) {
        this.elementProps.style.maskBorderSlice = value
        return this
    }

    maskBorderSource(value: Property.MaskBorderSource) {
        this.elementProps.style.maskBorderSource = value
        return this
    }

    maskBorderWidth(value: Property.MaskBorderWidth<TLength>) {
        this.elementProps.style.maskBorderWidth = value
        return this
    }

    maskClip(value: Property.MaskClip) {
        this.elementProps.style.maskClip = value
        return this
    }

    maskComposite(value: Property.MaskComposite) {
        this.elementProps.style.maskComposite = value
        return this
    }

    maskImage(value: Property.MaskImage) {
        this.elementProps.style.maskImage = value
        return this
    }

    maskMode(value: Property.MaskMode) {
        this.elementProps.style.maskMode = value
        return this
    }

    maskOrigin(value: Property.MaskOrigin) {
        this.elementProps.style.maskOrigin = value
        return this
    }

    maskPosition(value: Property.MaskPosition<TLength>) {
        this.elementProps.style.maskPosition = value
        return this
    }

    maskRepeat(value: Property.MaskRepeat) {
        this.elementProps.style.maskRepeat = value
        return this
    }

    maskSize(value: Property.MaskSize<TLength>) {
        this.elementProps.style.maskSize = value
        return this
    }

    maskType(value: Property.MaskType) {
        this.elementProps.style.maskType = value
        return this
    }

    mathStyle(value: Property.MathStyle) {
        this.elementProps.style.mathStyle = value
        return this
    }

    maxBlockSize(value: Property.MaxBlockSize<TLength>) {
        this.elementProps.style.maxBlockSize = value
        return this
    }

    maxHeight(value: Property.MaxHeight<TLength>) {
        this.elementProps.style.maxHeight = value
        return this
    }

    maxInlineSize(value: Property.MaxInlineSize<TLength>) {
        this.elementProps.style.maxInlineSize = value
        return this
    }

    maxLines(value: Property.MaxLines) {
        this.elementProps.style.maxLines = value
        return this
    }

    maxWidth(value: Property.MaxWidth<TLength>) {
        this.elementProps.style.maxWidth = value
        return this
    }

    minBlockSize(value: Property.MinBlockSize<TLength>) {
        this.elementProps.style.minBlockSize = value
        return this
    }

    minHeight(value: Property.MinHeight<TLength>) {
        this.elementProps.style.minHeight = value
        return this
    }

    minInlineSize(value: Property.MinInlineSize<TLength>) {
        this.elementProps.style.minInlineSize = value
        return this
    }

    minWidth(value: Property.MinWidth<TLength>) {
        this.elementProps.style.minWidth = value
        return this
    }

    mixBlendMode(value: Property.MixBlendMode) {
        this.elementProps.style.mixBlendMode = value
        return this
    }

    motionDistance(value: Property.OffsetDistance<TLength>) {
        this.elementProps.style.motionDistance = value
        return this
    }

    motionPath(value: Property.OffsetPath) {
        this.elementProps.style.motionPath = value
        return this
    }

    motionRotation(value: Property.OffsetRotate) {
        this.elementProps.style.motionRotation = value
        return this
    }

    objectFit(value: Property.ObjectFit) {
        this.elementProps.style.objectFit = value
        return this
    }

    objectPosition(value: Property.ObjectPosition<TLength>) {
        this.elementProps.style.objectPosition = value
        return this
    }

    offsetAnchor(value: Property.OffsetAnchor<TLength>) {
        this.elementProps.style.offsetAnchor = value
        return this
    }

    offsetDistance(value: Property.OffsetDistance<TLength>) {
        this.elementProps.style.offsetDistance = value
        return this
    }

    offsetPath(value: Property.OffsetPath) {
        this.elementProps.style.offsetPath = value
        return this
    }

    offsetRotate(value: Property.OffsetRotate) {
        this.elementProps.style.offsetRotate = value
        return this
    }

    offsetRotation(value: Property.OffsetRotate) {
        this.elementProps.style.offsetRotation = value
        return this
    }

    opacity(value: Property.Opacity) {
        this.elementProps.style.opacity = value
        return this
    }

    order(value: Property.Order) {
        this.elementProps.style.order = value
        return this
    }

    orphans(value: Property.Orphans) {
        this.elementProps.style.orphans = value
        return this
    }

    outlineColor(value: Property.OutlineColor) {
        this.elementProps.style.outlineColor = value
        return this
    }

    outlineOffset(value: Property.OutlineOffset<TLength>) {
        this.elementProps.style.outlineOffset = value
        return this
    }

    outlineStyle(value: Property.OutlineStyle) {
        this.elementProps.style.outlineStyle = value
        return this
    }

    outlineWidth(value: Property.OutlineWidth<TLength>) {
        this.elementProps.style.outlineWidth = value
        return this
    }

    overflowAnchor(value: Property.OverflowAnchor) {
        this.elementProps.style.overflowAnchor = value
        return this
    }

    overflowBlock(value: Property.OverflowBlock) {
        this.elementProps.style.overflowBlock = value
        return this
    }

    overflowClipBox(value: Property.OverflowClipBox) {
        this.elementProps.style.overflowClipBox = value
        return this
    }

    overflowClipMargin(value: Property.OverflowClipMargin<TLength>) {
        this.elementProps.style.overflowClipMargin = value
        return this
    }

    overflowInline(value: Property.OverflowInline) {
        this.elementProps.style.overflowInline = value
        return this
    }

    overflowWrap(value: Property.OverflowWrap) {
        this.elementProps.style.overflowWrap = value
        return this
    }

    overflowX(value: Property.OverflowX) {
        this.elementProps.style.overflowX = value
        return this
    }

    overflowY(value: Property.OverflowY) {
        this.elementProps.style.overflowY = value
        return this
    }

    overscrollBehaviorBlock(value: Property.OverscrollBehaviorBlock) {
        this.elementProps.style.overscrollBehaviorBlock = value
        return this
    }

    overscrollBehaviorInline(value: Property.OverscrollBehaviorInline) {
        this.elementProps.style.overscrollBehaviorInline = value
        return this
    }

    overscrollBehaviorX(value: Property.OverscrollBehaviorX) {
        this.elementProps.style.overscrollBehaviorX = value
        return this
    }

    overscrollBehaviorY(value: Property.OverscrollBehaviorY) {
        this.elementProps.style.overscrollBehaviorY = value
        return this
    }

    paddingBlock(value: Property.PaddingBlock<TLength>) {
        this.elementProps.style.paddingBlock = value
        return this
    }

    paddingBlockEnd(value: Property.PaddingBlockEnd<TLength>) {
        this.elementProps.style.paddingBlockEnd = value
        return this
    }

    paddingBlockStart(value: Property.PaddingBlockStart<TLength>) {
        this.elementProps.style.paddingBlockStart = value
        return this
    }

    paddingBottom(value: Property.PaddingBottom<TLength>) {
        this.elementProps.style.paddingBottom = value
        return this
    }

    paddingInline(value: Property.PaddingInline<TLength>) {
        this.elementProps.style.paddingInline = value
        return this
    }

    paddingInlineEnd(value: Property.PaddingInlineEnd<TLength>) {
        this.elementProps.style.paddingInlineEnd = value
        return this
    }

    paddingInlineStart(value: Property.PaddingInlineStart<TLength>) {
        this.elementProps.style.paddingInlineStart = value
        return this
    }

    paddingLeft(value: Property.PaddingLeft<TLength>) {
        this.elementProps.style.paddingLeft = value
        return this
    }

    paddingRight(value: Property.PaddingRight<TLength>) {
        this.elementProps.style.paddingRight = value
        return this
    }

    paddingTop(value: Property.PaddingTop<TLength>) {
        this.elementProps.style.paddingTop = value
        return this
    }

    pageBreakAfter(value: Property.PageBreakAfter) {
        this.elementProps.style.pageBreakAfter = value
        return this
    }

    pageBreakBefore(value: Property.PageBreakBefore) {
        this.elementProps.style.pageBreakBefore = value
        return this
    }

    pageBreakInside(value: Property.PageBreakInside) {
        this.elementProps.style.pageBreakInside = value
        return this
    }

    paintOrder(value: Property.PaintOrder) {
        this.elementProps.style.paintOrder = value
        return this
    }

    perspective(value: Property.Perspective<TLength>) {
        this.elementProps.style.perspective = value
        return this
    }

    perspectiveOrigin(value: Property.PerspectiveOrigin<TLength>) {
        this.elementProps.style.perspectiveOrigin = value
        return this
    }

    placeContent(value: Property.PlaceContent) {
        this.elementProps.style.placeContent = value
        return this
    }

    pointerEvents(value: Property.PointerEvents) {
        this.elementProps.style.pointerEvents = value
        return this
    }

    position(value: Property.Position) {
        this.elementProps.style.position = value
        return this
    }

    printColorAdjust(value: Property.PrintColorAdjust) {
        this.elementProps.style.printColorAdjust = value
        return this
    }

    quotes(value: Property.Quotes) {
        this.elementProps.style.quotes = value
        return this
    }

    resize(value: Property.Resize) {
        this.elementProps.style.resize = value
        return this
    }

    right(value: Property.Right<TLength>) {
        this.elementProps.style.right = value
        return this
    }

    rotate(value: Property.Rotate) {
        this.elementProps.style.rotate = value
        return this
    }

    rowGap(value: Property.RowGap<TLength>) {
        this.elementProps.style.rowGap = value
        return this
    }

    rubyAlign(value: Property.RubyAlign) {
        this.elementProps.style.rubyAlign = value
        return this
    }

    rubyMerge(value: Property.RubyMerge) {
        this.elementProps.style.rubyMerge = value
        return this
    }

    rubyPosition(value: Property.RubyPosition) {
        this.elementProps.style.rubyPosition = value
        return this
    }

    scale(value: Property.Scale) {
        this.elementProps.style.scale = value
        return this
    }

    scrollBehavior(value: Property.ScrollBehavior) {
        this.elementProps.style.scrollBehavior = value
        return this
    }

    scrollMargin(value: Property.ScrollMargin<TLength>) {
        this.elementProps.style.scrollMargin = value
        return this
    }

    scrollMarginBlock(value: Property.ScrollMarginBlock<TLength>) {
        this.elementProps.style.scrollMarginBlock = value
        return this
    }

    scrollMarginBlockEnd(value: Property.ScrollMarginBlockEnd<TLength>) {
        this.elementProps.style.scrollMarginBlockEnd = value
        return this
    }

    scrollMarginBlockStart(value: Property.ScrollMarginBlockStart<TLength>) {
        this.elementProps.style.scrollMarginBlockStart = value
        return this
    }

    scrollMarginBottom(value: Property.ScrollMarginBottom<TLength>) {
        this.elementProps.style.scrollMarginBottom = value
        return this
    }

    scrollMarginInline(value: Property.ScrollMarginInline<TLength>) {
        this.elementProps.style.scrollMarginInline = value
        return this
    }

    scrollMarginInlineEnd(value: Property.ScrollMarginInlineEnd<TLength>) {
        this.elementProps.style.scrollMarginInlineEnd = value
        return this
    }

    scrollMarginInlineStart(value: Property.ScrollMarginInlineStart<TLength>) {
        this.elementProps.style.scrollMarginInlineStart = value
        return this
    }

    scrollMarginLeft(value: Property.ScrollMarginLeft<TLength>) {
        this.elementProps.style.scrollMarginLeft = value
        return this
    }

    scrollMarginRight(value: Property.ScrollMarginRight<TLength>) {
        this.elementProps.style.scrollMarginRight = value
        return this
    }

    scrollMarginTop(value: Property.ScrollMarginTop<TLength>) {
        this.elementProps.style.scrollMarginTop = value
        return this
    }

    scrollPadding(value: Property.ScrollPadding<TLength>) {
        this.elementProps.style.scrollPadding = value
        return this
    }

    scrollPaddingBlock(value: Property.ScrollPaddingBlock<TLength>) {
        this.elementProps.style.scrollPaddingBlock = value
        return this
    }

    scrollPaddingBlockEnd(value: Property.ScrollPaddingBlockEnd<TLength>) {
        this.elementProps.style.scrollPaddingBlockEnd = value
        return this
    }

    scrollPaddingBlockStart(value: Property.ScrollPaddingBlockStart<TLength>) {
        this.elementProps.style.scrollPaddingBlockStart = value
        return this
    }

    scrollPaddingBottom(value: Property.ScrollPaddingBottom<TLength>) {
        this.elementProps.style.scrollPaddingBottom = value
        return this
    }

    scrollPaddingInline(value: Property.ScrollPaddingInline<TLength>) {
        this.elementProps.style.scrollPaddingInline = value
        return this
    }

    scrollPaddingInlineEnd(value: Property.ScrollPaddingInlineEnd<TLength>) {
        this.elementProps.style.scrollPaddingInlineEnd = value
        return this
    }

    scrollPaddingInlineStart(value: Property.ScrollPaddingInlineStart<TLength>) {
        this.elementProps.style.scrollPaddingInlineStart = value
        return this
    }

    scrollPaddingLeft(value: Property.ScrollPaddingLeft<TLength>) {
        this.elementProps.style.scrollPaddingLeft = value
        return this
    }

    scrollPaddingRight(value: Property.ScrollPaddingRight<TLength>) {
        this.elementProps.style.scrollPaddingRight = value
        return this
    }

    scrollPaddingTop(value: Property.ScrollPaddingTop<TLength>) {
        this.elementProps.style.scrollPaddingTop = value
        return this
    }

    scrollSnapAlign(value: Property.ScrollSnapAlign) {
        this.elementProps.style.scrollSnapAlign = value
        return this
    }

    scrollSnapMargin(value: Property.ScrollMargin<TLength>) {
        this.elementProps.style.scrollSnapMargin = value
        return this
    }

    scrollSnapMarginBottom(value: Property.ScrollMarginBottom<TLength>) {
        this.elementProps.style.scrollSnapMarginBottom = value
        return this
    }

    scrollSnapMarginLeft(value: Property.ScrollMarginLeft<TLength>) {
        this.elementProps.style.scrollSnapMarginLeft = value
        return this
    }

    scrollSnapMarginRight(value: Property.ScrollMarginRight<TLength>) {
        this.elementProps.style.scrollSnapMarginRight = value
        return this
    }

    scrollSnapMarginTop(value: Property.ScrollMarginTop<TLength>) {
        this.elementProps.style.scrollSnapMarginTop = value
        return this
    }

    scrollSnapStop(value: Property.ScrollSnapStop) {
        this.elementProps.style.scrollSnapStop = value
        return this
    }

    scrollSnapType(value: Property.ScrollSnapType) {
        this.elementProps.style.scrollSnapType = value
        return this
    }

    scrollbarColor(value: Property.ScrollbarColor) {
        this.elementProps.style.scrollbarColor = value
        return this
    }

    scrollbarGutter(value: Property.ScrollbarGutter) {
        this.elementProps.style.scrollbarGutter = value
        return this
    }

    scrollbarWidth(value: Property.ScrollbarWidth) {
        this.elementProps.style.scrollbarWidth = value
        return this
    }

    shapeImageThreshold(value: Property.ShapeImageThreshold) {
        this.elementProps.style.shapeImageThreshold = value
        return this
    }

    shapeMargin(value: Property.ShapeMargin<TLength>) {
        this.elementProps.style.shapeMargin = value
        return this
    }

    shapeOutside(value: Property.ShapeOutside) {
        this.elementProps.style.shapeOutside = value
        return this
    }

    tabSize(value: Property.TabSize<TLength>) {
        this.elementProps.style.tabSize = value
        return this
    }

    tableLayout(value: Property.TableLayout) {
        this.elementProps.style.tableLayout = value
        return this
    }

    textAlign(value: Property.TextAlign) {
        this.elementProps.style.textAlign = value
        return this
    }

    textAlignLast(value: Property.TextAlignLast) {
        this.elementProps.style.textAlignLast = value
        return this
    }

    textCombineUpright(value: Property.TextCombineUpright) {
        this.elementProps.style.textCombineUpright = value
        return this
    }

    textDecorationColor(value: Property.TextDecorationColor) {
        this.elementProps.style.textDecorationColor = value
        return this
    }

    textDecorationLine(value: Property.TextDecorationLine) {
        this.elementProps.style.textDecorationLine = value
        return this
    }

    textDecorationSkip(value: Property.TextDecorationSkip) {
        this.elementProps.style.textDecorationSkip = value
        return this
    }

    textDecorationSkipInk(value: Property.TextDecorationSkipInk) {
        this.elementProps.style.textDecorationSkipInk = value
        return this
    }

    textDecorationStyle(value: Property.TextDecorationStyle) {
        this.elementProps.style.textDecorationStyle = value
        return this
    }

    textDecorationThickness(value: Property.TextDecorationThickness<TLength>) {
        this.elementProps.style.textDecorationThickness = value
        return this
    }

    textDecorationWidth(value: Property.TextDecorationThickness<TLength>) {
        this.elementProps.style.textDecorationWidth = value
        return this
    }

    textEmphasisColor(value: Property.TextEmphasisColor) {
        this.elementProps.style.textEmphasisColor = value
        return this
    }

    textEmphasisPosition(value: Property.TextEmphasisPosition) {
        this.elementProps.style.textEmphasisPosition = value
        return this
    }

    textEmphasisStyle(value: Property.TextEmphasisStyle) {
        this.elementProps.style.textEmphasisStyle = value
        return this
    }

    textIndent(value: Property.TextIndent<TLength>) {
        this.elementProps.style.textIndent = value
        return this
    }

    textJustify(value: Property.TextJustify) {
        this.elementProps.style.textJustify = value
        return this
    }

    textOrientation(value: Property.TextOrientation) {
        this.elementProps.style.textOrientation = value
        return this
    }

    textOverflow(value: Property.TextOverflow) {
        this.elementProps.style.textOverflow = value
        return this
    }

    textRendering(value: Property.TextRendering) {
        this.elementProps.style.textRendering = value
        return this
    }

    textShadow(value: Property.TextShadow) {
        this.elementProps.style.textShadow = value
        return this
    }

    textSizeAdjust(value: Property.TextSizeAdjust) {
        this.elementProps.style.textSizeAdjust = value
        return this
    }

    textTransform(value: Property.TextTransform) {
        this.elementProps.style.textTransform = value
        return this
    }

    textUnderlineOffset(value: Property.TextUnderlineOffset<TLength>) {
        this.elementProps.style.textUnderlineOffset = value
        return this
    }

    textUnderlinePosition(value: Property.TextUnderlinePosition) {
        this.elementProps.style.textUnderlinePosition = value
        return this
    }

    top(value: Property.Top<TLength>) {
        this.elementProps.style.top = value
        return this
    }

    touchAction(value: Property.TouchAction) {
        this.elementProps.style.touchAction = value
        return this
    }

    transform(value: Property.Transform) {
        this.elementProps.style.transform = value
        return this
    }

    transformBox(value: Property.TransformBox) {
        this.elementProps.style.transformBox = value
        return this
    }

    transformOrigin(value: Property.TransformOrigin<TLength>) {
        this.elementProps.style.transformOrigin = value
        return this
    }

    transformStyle(value: Property.TransformStyle) {
        this.elementProps.style.transformStyle = value
        return this
    }

    transitionDelay(value: Property.TransitionDelay<TTime>) {
        this.elementProps.style.transitionDelay = value
        return this
    }

    transitionDuration(value: Property.TransitionDuration<TTime>) {
        this.elementProps.style.transitionDuration = value
        return this
    }

    transitionProperty(value: Property.TransitionProperty) {
        this.elementProps.style.transitionProperty = value
        return this
    }

    transitionTimingFunction(value: Property.TransitionTimingFunction) {
        this.elementProps.style.transitionTimingFunction = value
        return this
    }

    translate(value: Property.Translate<TLength>) {
        this.elementProps.style.translate = value
        return this
    }

    unicodeBidi(value: Property.UnicodeBidi) {
        this.elementProps.style.unicodeBidi = value
        return this
    }

    userSelect(value: Property.UserSelect) {
        this.elementProps.style.userSelect = value
        return this
    }

    verticalAlign(value: Property.VerticalAlign<TLength>) {
        this.elementProps.style.verticalAlign = value
        return this
    }

    visibility(value: Property.Visibility) {
        this.elementProps.style.visibility = value
        return this
    }

    whiteSpace(value: Property.WhiteSpace) {
        this.elementProps.style.whiteSpace = value
        return this
    }

    widows(value: Property.Widows) {
        this.elementProps.style.widows = value
        return this
    }

    width(value: Property.Width<TLength>) {
        this.elementProps.style.width = value
        return this
    }

    willChange(value: Property.WillChange) {
        this.elementProps.style.willChange = value
        return this
    }

    wordBreak(value: Property.WordBreak) {
        this.elementProps.style.wordBreak = value
        return this
    }

    wordSpacing(value: Property.WordSpacing<TLength>) {
        this.elementProps.style.wordSpacing = value
        return this
    }

    wordWrap(value: Property.WordWrap) {
        this.elementProps.style.wordWrap = value
        return this
    }

    writingMode(value: Property.WritingMode) {
        this.elementProps.style.writingMode = value
        return this
    }

    zIndex(value: Property.ZIndex) {
        this.elementProps.style.zIndex = value
        return this
    }

    zoom(value: Property.Zoom) {
        this.elementProps.style.zoom = value
        return this
    }

    all(value: Property.All) {
        this.elementProps.style.all = value
        return this
    }

    animation(value: Property.Animation<TTime>) {
        this.elementProps.style.animation = value
        return this
    }

    background(value: Property.Background<TLength>) {
        this.elementProps.style.background = value
        return this
    }

    backgroundPosition(value: Property.BackgroundPosition<TLength>) {
        this.elementProps.style.backgroundPosition = value
        return this
    }

    border(value: Property.Border<TLength>) {
        this.elementProps.style.border = value
        return this
    }

    borderBlock(value: Property.BorderBlock<TLength>) {
        this.elementProps.style.borderBlock = value
        return this
    }

    borderBlockEnd(value: Property.BorderBlockEnd<TLength>) {
        this.elementProps.style.borderBlockEnd = value
        return this
    }

    borderBlockStart(value: Property.BorderBlockStart<TLength>) {
        this.elementProps.style.borderBlockStart = value
        return this
    }

    borderBottom(value: Property.BorderBottom<TLength>) {
        this.elementProps.style.borderBottom = value
        return this
    }

    borderColor(value: Property.BorderColor) {
        this.elementProps.style.borderColor = value
        return this
    }

    borderImage(value: Property.BorderImage) {
        this.elementProps.style.borderImage = value
        return this
    }

    borderInline(value: Property.BorderInline<TLength>) {
        this.elementProps.style.borderInline = value
        return this
    }

    borderInlineEnd(value: Property.BorderInlineEnd<TLength>) {
        this.elementProps.style.borderInlineEnd = value
        return this
    }

    borderInlineStart(value: Property.BorderInlineStart<TLength>) {
        this.elementProps.style.borderInlineStart = value
        return this
    }

    borderLeft(value: Property.BorderLeft<TLength>) {
        this.elementProps.style.borderLeft = value
        return this
    }

    borderRadius(value: Property.BorderRadius<TLength>) {
        this.elementProps.style.borderRadius = value
        return this
    }

    borderRight(value: Property.BorderRight<TLength>) {
        this.elementProps.style.borderRight = value
        return this
    }

    borderStyle(value: Property.BorderStyle) {
        this.elementProps.style.borderStyle = value
        return this
    }

    borderTop(value: Property.BorderTop<TLength>) {
        this.elementProps.style.borderTop = value
        return this
    }

    borderWidth(value: Property.BorderWidth<TLength>) {
        this.elementProps.style.borderWidth = value
        return this
    }

    columnRule(value: Property.ColumnRule<TLength>) {
        this.elementProps.style.columnRule = value
        return this
    }

    columns(value: Property.Columns<TLength>) {
        this.elementProps.style.columns = value
        return this
    }

    flex(value: Property.Flex<TLength>) {
        this.elementProps.style.flex = value
        return this
    }

    flexFlow(value: Property.FlexFlow) {
        this.elementProps.style.flexFlow = value
        return this
    }

    font(value: Property.Font) {
        this.elementProps.style.font = value
        return this
    }

    gap(value: Property.Gap<TLength>) {
        this.elementProps.style.gap = value
        return this
    }

    grid(value: Property.Grid) {
        this.elementProps.style.grid = value
        return this
    }

    gridArea(value: Property.GridArea) {
        this.elementProps.style.gridArea = value
        return this
    }

    gridColumn(value: Property.GridColumn) {
        this.elementProps.style.gridColumn = value
        return this
    }

    gridRow(value: Property.GridRow) {
        this.elementProps.style.gridRow = value
        return this
    }

    gridTemplate(value: Property.GridTemplate) {
        this.elementProps.style.gridTemplate = value
        return this
    }

    lineClamp(value: Property.LineClamp) {
        this.elementProps.style.lineClamp = value
        return this
    }

    listStyle(value: Property.ListStyle) {
        this.elementProps.style.listStyle = value
        return this
    }

    margin(value: Property.Margin<TLength>) {
        this.elementProps.style.margin = value
        return this
    }

    mask(value: Property.Mask<TLength>) {
        this.elementProps.style.mask = value
        return this
    }

    maskBorder(value: Property.MaskBorder) {
        this.elementProps.style.maskBorder = value
        return this
    }

    motion(value: Property.Offset<TLength>) {
        this.elementProps.style.motion = value
        return this
    }

    offset(value: Property.Offset<TLength>) {
        this.elementProps.style.offset = value
        return this
    }

    outline(value: Property.Outline<TLength>) {
        this.elementProps.style.outline = value
        return this
    }

    overflow(value: Property.Overflow) {
        this.elementProps.style.overflow = value
        return this
    }

    overscrollBehavior(value: Property.OverscrollBehavior) {
        this.elementProps.style.overscrollBehavior = value
        return this
    }

    padding(value: Property.Padding<TLength>) {
        this.elementProps.style.padding = value
        return this
    }

    placeItems(value: Property.PlaceItems) {
        this.elementProps.style.placeItems = value
        return this
    }

    placeSelf(value: Property.PlaceSelf) {
        this.elementProps.style.placeSelf = value
        return this
    }

    textDecoration(value: Property.TextDecoration<TLength>) {
        this.elementProps.style.textDecoration = value
        return this
    }

    textEmphasis(value: Property.TextEmphasis) {
        this.elementProps.style.textEmphasis = value
        return this
    }

    transition(value: Property.Transition<TTime>) {
        this.elementProps.style.transition = value
        return this
    }

}
