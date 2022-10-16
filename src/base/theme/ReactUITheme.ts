import {ReactUIHelper} from "../utils/ReactUIHelper";
import {ReactUIContext} from "../context/ReactUIContext";
import ReactUIBase from "../base/ReactUIBase";
import {uid} from "../utils/Utils";
import {ThemeStore} from "./Store";

export class ReactUITheme extends ReactUIContext {
    readonly IAmReactUITheme = true
    protected readonly defaultTheme: { [key: string]: any } = {}
    protected readonly defaultThemes: { [key: string]: any } = {}
    protected defaultThemeName: string = "_NONE_"


    themeId = uid()
    willUseTheme = false

    get theme() {
        let defaultTheme = this.defaultThemeName === "_NONE_" ? this.defaultTheme : this.defaultThemes[this.defaultThemeName]
        if (!this.willUseTheme) return defaultTheme
        let themes = ThemeStore[this.themeId].themes
        let themeName = ThemeStore[this.themeId].themeName
        let theme = themes[themeName][this.constructor.name]
        if (theme === undefined) return defaultTheme

        return {...defaultTheme, ...theme}
    }

    private _themeTag: string = ""
    themeTag(value: string) {
        this._themeTag = "_"+value
        return this
    }

    themeName(value: string) {
        this.defaultThemeName = value
        return this
    }

    passDownTheme() {
        if (!this.willUseTheme) return
        this.forEachChild(child => {
            if (child.IAMThemeProvider) return false
            if (child.IAmReactUITheme) {
                child.themeId = this.themeId
                child.willUseTheme = true
            }
        }, true)
    }
}
