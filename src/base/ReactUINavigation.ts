import ReactUIBase from "./ReactUIBase";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {isInstanceOf} from "./Utils";
import {ReactUIThemeBase} from "./ReactUITheme";
import {Div} from "./HTMLTags";
import {createElement} from "react";

export interface PathRoutes {
    [key: string]: ReactUIBase | ((value: string) => ReactUIBase | any) | any
}

class NavigationView extends ReactUIThemeBase {
    pathRoutes: PathRoutes

    constructor(pathRoutes: PathRoutes) {
        super(Routes)
        this.pathRoutes = pathRoutes
    }

    beforeAsReactElement() {
        let regexNames = []
        // ---- plain names
        for (let path in this.pathRoutes) {
            if (path.startsWith(":")) {
                regexNames.push(path)
            } else {
                const newRoute = new NavigationRoute(this.pathRoutes[path], path, this.reactUIThemeTag, this.reactUIThemes)
                this.children.push(newRoute)
            }
        }

        // ---- regex matches
        let regexPathRoutes: any = {}
        let withSubPathArr = []
        for (let regexName of regexNames) {
            let newRegexName = regexName.replace(":", "").replace("/*", "")
            withSubPathArr.push(regexName.endsWith("/*"))
            regexPathRoutes[newRegexName] = this.pathRoutes[regexName]
        }

        // ---- if any of the path contains /*, set withSubPath true
        let withSubPath = withSubPathArr.includes(true)
        if (Object.keys(regexPathRoutes).length !== 0) {
            const newRoute = new NavigationRouteMatchable(regexPathRoutes, withSubPath, this.reactUIThemeTag, this.reactUIThemes)
            this.children.push(newRoute)
        }
    }
}

export class NavigationRoute extends ReactUIBase {
    constructor(element: ReactUIBase | any, path: string, reactUIThemeTag: any, reactUIThemes: any) {
        super(Route)
        function Element() {
            if (isInstanceOf(element, "ReactUIThemeBase")) {
                element.themeTag(reactUIThemeTag)
                element.themes(reactUIThemes)
            }

            return isInstanceOf(element, "ReactUIBase") ? element.asReactElement() : element
        }

        this.setProps({
            element: createElement(Element),
            path: path
        })
    }
}

export class NavigationRouteMatchable extends ReactUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => ReactUIBase | any)} | any, withSubPath: boolean,
                reactUIThemeTag: any, reactUIThemes: any) {
        super(Route)

        function Element() {
            const { value } = useParams();
            let matchedName = null
            for (let name in regexPathRoutes) {
                let regex = new RegExp(name)
                if (regex.test(value as string)) {
                    matchedName = name
                    break
                }
            }
            let element = matchedName === null ? Div() : regexPathRoutes[matchedName](value ?? "")

            if (isInstanceOf(element, "ReactUIThemeBase")) {
                (element as ReactUIThemeBase).themeTag(reactUIThemeTag);
                (element as ReactUIThemeBase).themes(reactUIThemes)
            }

            return isInstanceOf(element, "ReactUIBase") ? element.asReactElement() : element
        }

        this.setProps({
            element: createElement(Element),
            path: withSubPath ? ":value/*" : ":value"
        })
    }
}


export default function (pathRoutes: PathRoutes) {
    return new NavigationView(pathRoutes)
}


export function NavigateBack() {
    let navigate = useNavigate()
    return () => {navigate(-1)}
}

export function NavigateTo(path: any) {
    let navigate = useNavigate()
    return () => navigate(path)
}
