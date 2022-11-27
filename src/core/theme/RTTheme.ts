import {RTContext} from "../context/RTContext";
import Running from "../base/Running";

export class RTTheme extends RTContext {
    readonly IAmRTTheme = true
    protected readonly defaultTheme: { [key: string]: any } = {}
    protected readonly defaultThemes: { [key: string]: any } = {}
    protected defaultThemeName: string = "_NONE_"
    _name?: string

    // ---- not like context, theme not allow theme passing through
    themeId?: string

    themeState: any

    get theme() {
        let defaultTheme = this.defaultThemeName === "_NONE_" ? this.defaultTheme : this.defaultThemes[this.defaultThemeName]
        if (!this.themeId) return defaultTheme
        let themes = Running.ThemeStore[this.themeId].themes
        let themeName = Running.ThemeStore[this.themeId].themeName
        let theme = themes[themeName][this._name ?? this.constructor.name]
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
            if (child.IAmRTTheme) {
                child.themeId = this.themeId
                child.willUseTheme = true
            }
        }, true)
    }

    beforeAsReactElement() {
        if (!!this.themeId)  {
            this.themeState = Running.ContextStore[this.themeId]["themeState"]
            this.customProps.contextNameStore.push("themeState")
        }
    }
}
