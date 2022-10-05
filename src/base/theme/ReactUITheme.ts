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
        return this
    }

    get theme() {
        if (!this.ruiThemeName) {
            ReactUIHelper.warn(`theme tag is null in ${this.constructor.name}`)
            return null
        }
        return {...this.defaultTheme, ...this.ruiThemes[this.ruiThemeName]}
    }

    themes(value: {[key: string]: any}) {
        this.ruiThemes = {...this.ruiThemes, ...value}
        return this
    }

    themeName(value: string) {
        if (Object.keys(this.ruiThemes).includes(value)) {
            this.ruiThemeName = value
        }
        return this
    }

    // ---- pass down
    setPassDownThemes(value: {[key: string]: {[key: string]: any}}) {
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

        this.forEachChild(child => {
            if (child.IAmReactUITheme) {
                (child as ReactUITheme).setPassDownThemes(value)
            }
        }, true)

        return this
    }

    setPassDownThemeName(value: string) {
        if (Object.keys(this.ruiThemes).includes(value)) {
            this.ruiThemeName = value
        }
        this.passDownThemeName = value
        this.forEachChild(child => {
            if (child.IAmReactUITheme) {
                (child as ReactUITheme).setPassDownThemeName(value)
            }
        }, true)
    }

    passDownTheme(view: ReactUITheme) {
        view.setPassDownThemes(this.passDownThemes)
        view.setPassDownThemeName(this.passDownThemeName)
    }
}
