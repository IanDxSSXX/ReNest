import {RTHelper} from "../utils/RTHelper";
import {useState} from "react";

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
        RTHelper.throw(`must provide a solid object to useTheme.`)
    }
    defaultThemeName = !!defaultThemeName ? defaultThemeName : Object.keys(themes)[0]
    let [themeName, setThemeName] = useState(defaultThemeName)
    return new ThemesState(themes, themeName, setThemeName)
}