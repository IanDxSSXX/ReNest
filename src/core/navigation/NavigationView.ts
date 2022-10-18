import RUIBase from "../base/RUIBase";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {RUITheme} from "../theme/RUITheme";
import {createElement, ReactElement} from "react";
import {FragmentView, TagView} from "../utils/RUIWrapper";
import {NavigationRoute, NavigationRouteMatchable} from "./NavigationRoute";
import {BrowserRouter as RRDBrowserRouter} from "react-router-dom";


// ---- encapsulate react-router
export interface PathRoutes {
    [key: string]: (value?: string) => (RUIBase | ReactElement)
}

export class NavigationView extends RUITheme {
    pathRoutes: PathRoutes
    regexTag = "_"

    constructor(pathRoutes: PathRoutes) {
        super(Routes)
        this.pathRoutes = pathRoutes
    }

    beforeAsReactElement() {
        let regexNames = []
        // ---- plain names
        for (let path in this.pathRoutes) {
            if (path.startsWith(this.regexTag)) {
                regexNames.push(path)
            } else {
                const newRoute = new NavigationRoute(
                    this.pathRoutes[path] as (() => (RUIBase | ReactElement)), path, this
                )
                this.children.push(newRoute)
            }
        }

        // ---- regex matches
        let regexPathRoutes: any = {}
        let withSubPathArr = []
        for (let regexName of regexNames) {
            let newRegexName = regexName.replace(this.regexTag, "").replace("/*", "")
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

export default (pathRoutes: PathRoutes) => new NavigationView(pathRoutes)


export function BrowserRouter(...children: any[]) {
return TagView(RRDBrowserRouter)(...children)
}
