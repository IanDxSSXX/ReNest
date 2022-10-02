import ReactUIBase from "./ReactUIBase";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {ReactUIThemeBase} from "./ReactUITheme";
import {Div} from "./HTMLTags";
import {createElement, ReactElement} from "react";
import {RUIFragment} from "./ReactUIWrapper";


export interface PathRoutes {
    [key: string]: (value?: string) => (ReactUIBase | ReactElement)
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
                const newRoute = new NavigationRoute(this.pathRoutes[path] as (() => (ReactUIBase | ReactElement)),
                    path, this.reactUIThemeTag, this.reactUIThemes)
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
    constructor(elementFunc: () => (ReactUIBase | ReactElement), path: string, reactUIThemeTag: any, reactUIThemes: any) {
        super(Route)
        function Element() {
            let element = elementFunc()
            if ((element as any).IAmReactUIThemeBase??false) {
                (element as ReactUIThemeBase).themeTag(reactUIThemeTag);
                (element as ReactUIThemeBase).themes(reactUIThemes)
            }

            return ((element as any).IAmReactUI??false) ? (element as ReactUIThemeBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: path
        })
    }
}

export class NavigationRouteMatchable extends ReactUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => (ReactUIBase | ReactElement))}, withSubPath: boolean,
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
            let element: any = matchedName === null ? RUIFragment() : regexPathRoutes[matchedName]
            if (element instanceof Function) {
                element = element(value ?? "")
            }

            if (element.IAmReactUIThemeBase??false) {
                (element as ReactUIThemeBase).themeTag(reactUIThemeTag);
                (element as ReactUIThemeBase).themes(reactUIThemes)
            }

            return (element.IAmReactUI??false) ? (element as ReactUIBase).asReactElement() : element as ReactElement
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
