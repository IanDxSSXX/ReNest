import {Fragment, useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";
import {ReactUITheme} from "./ReactUITheme";
import {ReactUIBase} from "../index.core";

namespace C {
    export class ThemeProvider extends ReactUIBase {
        // ---- same as RUIFragment
        constructor(...children: any[]) {
            super(Fragment, ...children);
        }
        beforeAsReactElement() {
            if (!!this.elementProps && !!this.elementProps.key) {
                this.elementProps = {key: this.elementProps.key}
            } else {
                this.elementProps = undefined
            }
        }

        theme(themeState: ThemesState) {
            this.forEachChild(child => {
                // ---- themes
                if (child.IAmReactUITheme) {
                    (child as ReactUITheme).setPassDownThemes(themeState.themes);
                    (child as ReactUITheme).setPassDownThemeName(themeState.themeName);
                }
                // ---- set context
                child.customProps.context = {...child.customProps.context, ...{theme: themeState}}
            }, true)
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

    constructor(themes: { [key: string]: { [key: string]: any }}, themeName: string, setThemeName: any) {
        this.themes = themes
        this.themeName = themeName
        this.setThemeName = setThemeName
    }
}

export function useThemes(themes: { [key: string]: { [key: string]: any }}, defaultThemeName?: string) {
    if (typeof themes !== "object" || Object.keys(themes).length === 0) {
        ReactUIHelper.error(`must provide a solid object to useThemes.`)
    }
    defaultThemeName = !!defaultThemeName ? defaultThemeName : Object.keys(themes)[0]
    let [themeName, setThemeName] = useState(defaultThemeName)
    return new ThemesState(themes, themeName, setThemeName)
}