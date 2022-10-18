import {createElement, memo, useEffect, useRef, useState} from "react";
import {RUIHelper} from "../utils/RUIHelper";
import {Fragment, FragmentView} from "../utils/RUIWrapper";
import {ThemesState} from "./ThemeState";
import Running from "../base/Running";
import lodash from "lodash";
import {RUIElement} from "../element/RUIElement";
import {uid} from "../utils/Utils";
import {ContextProvider} from "../index";


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
        themes: wrapper.themes,
        themeName: wrapper.themeName
    }
    let element = wrapper.children[0]

    return wrapper.registerView(element).asReactElement()
}

const ThemeWrapperMemorized = memo(ThemeWrapper, (prev, curr) => {
    let preElement = prev.wrapper.children[0]
    let currElement = curr.wrapper.children[0]

    let themeEqual = lodash.isEqual(prev.wrapper.themes, curr.wrapper.themes)
        && prev.wrapper.themeName === curr.wrapper.themeName
    // console.log(prev, themeEqual && (preElement.IAmRUIElement && preElement.equalTo(currElement)))
    return themeEqual && (preElement.IAmRUIElement && preElement.equalTo(currElement))
})

class ThemeProvider extends RUIElement {
    themes: any = {}
    themeName: any = "_NONE_"

    currThemeState?: ThemesState
    IAMThemeProvider = true
    themeId = uid()
    useTheme = (themeState: ThemesState) => {
        this.currThemeState = themeState
        this.themes = themeState.themes
        this.themeName = themeState.themeName
        return this
    }

    constructor(...children: any) {
        super("", ...children);
    }


    asReactElement() {
        // ---- wrap children
        if (!!this.currThemeState) {
            // ---- add to context by default
            let ContextView = ContextProvider(...this.children).context({themeState: this.currThemeState})
            ContextView.contextId = this.themeId
            this.children = [ContextView]
        } else {
            this.children = [FragmentView(...this.children)]
        }

        return createElement(
            ThemeWrapperMemorized,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}
