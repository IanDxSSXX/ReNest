import {createElement, memo, useEffect, useRef, useState} from "react";
import {RUIHelper} from "../utils/RUIHelper";
import {Fragment, FragmentView} from "../utils/RUIWrapper";
import {ThemesState} from "./ThemeState";
import Running from "../base/Running";
import lodash from "lodash";
import {RUIElement} from "../element/RUIElement";
import {uid} from "../utils/Utils";


export default (...children: any[]) => new ThemeProvider(...children)


// ---* condition
function ThemeWrapper({wrapper}: any) {
    // ---- very important, see notes
    const themeId = useRef(null)
    if (themeId.current !== null) wrapper.themeId = themeId.current
    useEffect(() => {
        themeId.current = wrapper.themeId
        return () => {
            delete Running.ThemeStore[wrapper.themeId]
        }
    },[])

    Running.ThemeStore[wrapper.themeId] = {
        themes: wrapper.themeState.themes,
        themeName: wrapper.themeState.themeName
    }
    let element = wrapper.children[0]

    return wrapper.registerView(element).asReactElement()
}

const ThemeWrapperMemorized = memo(ThemeWrapper, (prev, curr) => {
    let preElement = prev.wrapper.children[0]
    let currElement = curr.wrapper.children[0]

    let themeEqual = lodash.isEqual(prev.wrapper.themeStoreValue, curr.wrapper.themeStoreValue)
    return themeEqual && (preElement.IAmRUIElement && preElement.equalTo(currElement))
})

class ThemeProvider extends RUIElement {
    themeState?: ThemesState
    IAMThemeProvider = true
    themeId = uid()
    useTheme = (themeState: ThemesState) => {
        this.themeState = themeState
        return this
    }

    constructor(...children: any) {
        super("", ...children);
    }


    asReactElement() {
        // ---- wrap children
        this.children = [FragmentView(...this.children)]

        return createElement(
            ThemeWrapperMemorized,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}
