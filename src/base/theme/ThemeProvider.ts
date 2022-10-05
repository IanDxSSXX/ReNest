import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {flattened} from "../utils/Utils";
import {useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";

namespace C {
    export class ThemeProvider extends RUIWrapperC.RUIFragment {
        private themes(value: { [key: string]: { [key: string]: any }}) {
            for (let child of this.children) {
                if ((child as any).IAmReactUITheme) {
                    child.themes(value, true)
                }
            }
            return this
        }

        private themeName(value: string) {
            for (let child of flattened(this.children)) {
                if (child.IAmReactUITheme) {
                    child.themeName(value)
                }
            }
            return this
        }

        theme(themeState: ThemesState) {
            this.themes(themeState.themes)
            this.themeName(themeState.themeName)
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

export function useThemes(themes: { [key: string]: { [key: string]: any }}) {
    if (typeof themes !== "object" || Object.keys(themes).length === 0) {
        ReactUIHelper.error(`must provide a solid object to useThemes.`)
    }
    let defaultThemeName = Object.keys(themes)[0]
    let [themeName, setThemeName] = useState(defaultThemeName)
    return new ThemesState(themes, themeName, setThemeName)
}