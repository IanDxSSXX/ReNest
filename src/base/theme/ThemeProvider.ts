import {Fragment, useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";
import {ReactUITheme} from "./ReactUITheme";
import {ReactUIBase} from "../index.core";
import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {ThemeStore} from "./Store";

namespace C {
    export class ThemeProvider extends RUIWrapperC.RUIFragment {
        IAMThemeProvider = true
        useTheme(themeState: ThemesState) {
            ThemeStore[this.themeId] = {
                themes: themeState.themes,
                themeName: themeState.themeName
            }
            this.willUseTheme = true
            this.passDownTheme()

            return this
        }
    }
}


export function ThemeProvider(...children: any[]) {
    return new C.ThemeProvider(...children)
}


export class ThemesState {
    themes: any
    private readonly setThemeName: any
    themeName: string

    to(themeName: string) {
        this.setThemeName(themeName)
    }
    
    is(themeName: string) {
        return this.themeName === themeName
    }

    constructor(themes: { [key: string]: { [key: string]: any }}, themeName: string, setThemeName: any) {
        this.themes = themes
        this.themeName = themeName
        this.setThemeName = setThemeName
    }
}

export function useTheme(themes: { [key: string]: { [key: string]: any }}, defaultThemeName?: string) {
    if (typeof themes !== "object" || Object.keys(themes).length === 0) {
        ReactUIHelper.error(`must provide a solid object to useTheme.`)
    }
    defaultThemeName = !!defaultThemeName ? defaultThemeName : Object.keys(themes)[0]
    let [themeName, setThemeName] = useState(defaultThemeName)
    return new ThemesState(themes, themeName, setThemeName)
}