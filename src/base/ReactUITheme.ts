import {CSSProperties} from "react";
import {flattened} from "./Utils";
import ReactUIBase from "./ReactUIBase";
import {defaultReactUITheme, defaultReactUIThemeFont, globalTag} from "./Defaults";
import {
    ReactUITheme,
    ReactUIThemeColor,
    ReactUIThemeColorMap,
    ReactUIThemeMap
} from "./Interfaces";

import ReactUIWithStyle from "./ReactUIWithStyle";

class ThemeView extends ReactUIBase {
    reactUIThemes: ReactUIThemeMap = {}
    constructor(...children: any[]) {
        super("div", ...children);
    }

    setChildrenTheme() {
        for (let child of this.children) {
            if ((child as any).IAmReactUIThemeBase??false) {
                child.themes(this.reactUIThemes)
            }
        }
    }

    theme(value: ReactUITheme) {
        this.reactUIThemes[globalTag] = value
        this.setChildrenTheme()
        return this
    }

    themes(value: ReactUIThemeMap) {
        this.reactUIThemes = {...this.reactUIThemes, ...value}
        this.setChildrenTheme()
        return this
    }

}


export class ReactUIThemeBase extends ReactUIWithStyle {
    IAmReactUIThemeBase = true
    reactUIThemeTag: string = globalTag
    reactUIThemes: ReactUIThemeMap = {}
    themeColorMap: ReactUIThemeColorMap = {}
    
    get themeColor() {
        let reactUITheme = this.reactUIThemes[this.reactUIThemeTag] ?? defaultReactUITheme
        return {
            first: reactUITheme.colors![this.themeColorMap["first"] ?? "primary"]!,
            second: reactUITheme.colors![this.themeColorMap["second"] ?? "secondary"]!,
            third: reactUITheme.colors![this.themeColorMap["third"] ?? "tertiary"]!,
            forth: reactUITheme.colors![this.themeColorMap["forth"] ?? "foreground"]!,
            fifth: reactUITheme.colors![this.themeColorMap["fifth"] ?? "background"]!
        }
    }

    get themeFont() {
        let reactUITheme = this.reactUIThemes[this.reactUIThemeTag] ?? defaultReactUITheme
        return reactUITheme.font
    }

    setColor(...colorTypes: (keyof ReactUIThemeColor)[]) {
        const colorMaps: (keyof ReactUIThemeColorMap)[] = ["first", "second", "third", "forth", "fifth"]
        colorTypes.forEach((value, index) => {
            this.themeColorMap[colorMaps[index]] = value
        })

        return this
    }

    themes(value: ReactUIThemeMap) {
        if (Object.keys(this.reactUIThemes).length !== 0) return
        let reactUIThemes: ReactUIThemeMap = {}
        for (let key in value) {
            reactUIThemes[key] = themeWithDefault(value[key])
        }
        this.reactUIThemes = {...this.reactUIThemes, ...reactUIThemes}
        for (let child of flattened(this.children)) {
            if ((child as any).IAmReactUIThemeBase??false) {
                child.themes(this.reactUIThemes)
            }
        }
        return this
    }
    themeTag(value: string) {
        if (this.reactUIThemeTag !== globalTag) return this
        this.reactUIThemeTag = value

        for (let child of flattened(this.children)) {
            if ((child as any).IAmReactUIThemeBase??false) {
                    child.themeTag(value)
            }
        }
        return this
    }
}


export default function (...children: any[]) {
    return new ThemeView(...children)
}




export function themeWithDefault(theme: ReactUITheme | any) {
    let newTheme: ReactUITheme = {colors: {}, font: {}}
    for (let key in defaultReactUITheme.colors) {
        let newKey = key as keyof ReactUIThemeColor
        newTheme.colors![newKey] = {...defaultReactUITheme.colors![newKey], ...theme?.colors[newKey] ?? {}}
    }
    newTheme.font = {...defaultReactUITheme.font, ...theme?.font ?? {}}
    return newTheme
}