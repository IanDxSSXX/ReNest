import {flattened} from "../utils/Utils";
import ReactUIWithStyle from "../core/ReactUIWithStyle";
import {ReactUIHelper} from "../utils/ReactUIHelper";

export class ReactUITheme extends ReactUIWithStyle {
    IAmReactUITheme = true

    // ---- current element themes
    ruiThemeName: string = "default"
    defaultTheme: { [key: string]: any } = {}
    private _ruiThemes: { [key: string]: any } = {} 
    get ruiThemes(): { [key: string]: any } {
        return {"default": this.defaultTheme, ...this._ruiThemes}
    }
    set ruiThemes(value: { [key: string]: any }) {
        this._ruiThemes = value
    }
    private _themeTag: string = ""

    // --- pass down themes
    passDownThemes: { [key: string]: { [key: string]: any } }  = {}
    passDownThemeName: string = ""

    themeTag(value: string) {
        this._themeTag = "_"+value
    }

    get theme() {
        if (!this.ruiThemeName) {
            ReactUIHelper.warn(`theme tag is null in ${this.constructor.name}`)
            return null
        }
        return {...this.defaultTheme, ...this.ruiThemes[this.ruiThemeName]}
    }

    private setThemes(value: {[key: string]: any}) {
        this.ruiThemes = {...this.ruiThemes, ...value}
        return this
    }

    private setPassDownThemes(value: {[key: string]: {[key: string]: any}}) {
        this.passDownThemes = value
        // ---- current Element's themes
        let currElementThemes: { [key: string]: any } = {}
        for (let key in value) {
            // ---- only add themes that contain current element type
            // ---- e.g. Button_1
            let theme = value[key][this.constructor.name+this._themeTag]
            if (!!theme) {
                currElementThemes[key] = theme
            }
        }

        this.ruiThemes = {...this.ruiThemes, ...currElementThemes}

        for (let child of flattened(this.children)) {
            if (child.IAmReactUITheme) {
                child.themes(value, true)
            }
        }
        return this
    }

    themes(value: {[key: string]: {[key: string]: any}} | {[key: string]: any}, passDown=false) {
        if (passDown) return this.setPassDownThemes(value)
        return this.setThemes(value)
    }

    themeName(value: string, passDown=true) {
        if (Object.keys(this.ruiThemes).includes(value)) {
            this.ruiThemeName = value
        }
        this.passDownThemeName = value
        if (passDown) {
            for (let child of flattened(this.children)) {
                if (child.IAmReactUITheme) {
                    child.themeName(value)
                }
            }
        }
        return this
    }

    passDownTheme(view: ReactUITheme) {
        view.themes(this.passDownThemes, true)
        view.themeName(this.passDownThemeName)
    }
}
