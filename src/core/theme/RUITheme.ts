import {RUIContext} from "../context/RUIContext";
import {filteredObject, uid} from "../utils/Utils";
import RUIBase from "../base/RUIBase";
import Running from "../base/Running";

export class RUITheme extends RUIContext {
    readonly IAmRUITheme = true
    protected readonly defaultTheme: { [key: string]: any } = {}
    protected readonly defaultThemes: { [key: string]: any } = {}
    protected defaultThemeName: string = "_NONE_"

    themeId?: string

    get theme() {
        let defaultTheme = this.defaultThemeName === "_NONE_" ? this.defaultTheme : this.defaultThemes[this.defaultThemeName]
        if (!this.themeId) return defaultTheme
        let themes = Running.ThemeStore[this.themeId].themes
        let themeName = Running.ThemeStore[this.themeId].themeName
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
        if (!this.themeId) return
        this.forEachChild(child => {
            if (child.IAMThemeProvider) return false
            if (child.IAmRUITheme) {
                child.themeId = this.themeId
                child.willUseTheme = true
            }
        }, true)
    }
}
