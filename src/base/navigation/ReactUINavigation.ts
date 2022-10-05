import ReactUIBase from "../core/ReactUIBase";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {ReactUITheme} from "../theme/ReactUITheme";
import {createElement, ReactElement} from "react";
import {RUIFragment} from "../utils/ReactUIWrapper";


// ---- encapsulate react-router
export interface PathRoutes {
    [key: string]: (value?: string) => (ReactUIBase | ReactElement)
}

class NavigationView extends ReactUITheme {
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
                const newRoute = new NavigationRoute(
                    this.pathRoutes[path] as (() => (ReactUIBase | ReactElement)), path, this
                )
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
            const newRoute = new NavigationRouteMatchable(regexPathRoutes, withSubPath, this)
            this.children.push(newRoute)
        }
    }
}

export class NavigationRoute extends ReactUIBase {
    constructor(elementFunc: () => (ReactUIBase | ReactElement), path: string, navigationView: NavigationView) {
        super(Route)
        function Element() {
            let element = elementFunc()
            if ((element as any).IAmReactUITheme) {
                navigationView.passDownTheme(element as ReactUITheme)
            }

            return ((element as any).IAmReactUI) ? (element as ReactUIBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: path
        })
    }
}

export class NavigationRouteMatchable extends ReactUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => (ReactUIBase | ReactElement))}, withSubPath: boolean,
                navigationView: NavigationView) {
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

            if (element.IAmReactUITheme) {
                navigationView.passDownTheme(element as ReactUITheme)
            }

            return (element.IAmReactUI) ? (element as ReactUIBase).asReactElement() : element as ReactElement
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
