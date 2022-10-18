import RUIBase from "../base/RUIBase";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {RUITheme} from "../theme/RUITheme";
import {createElement, ReactElement, useEffect, useRef} from "react";
import {FragmentView, TagView} from "../utils/RUIWrapper";
import {NavigationRoute, NavigationRouteMatchable} from "./NavigationRoute";
import {BrowserRouter as RRDBrowserRouter} from "react-router-dom";
import {RUIElement} from "../element/RUIElement";
import {uid} from "../utils/Utils";




function NavigationWrapper({wrapper}: any) {
    // ---- very important, see notes
    const navigationIds = useRef(null)
    if (navigationIds.current !== null) wrapper.navigationIds = navigationIds.current
    useEffect(() => {
        navigationIds.current = wrapper.navigationIds
    },[])

    let children = wrapper.children.map((child: any)=>
        child.IAmRUI ? child.asReactElement() : child)

    return createElement(
        Routes,
        {},
        ...children
    )
}


export interface PathRoutes {
    [key: string]: (value?: string) => (RUIBase | ReactElement)
}

export class NavigationView extends RUIElement {
    pathRoutes: PathRoutes
    regexTag = "_"
    navigationIds: {[key:string]: string} = {}

    constructor(pathRoutes: PathRoutes) {
        super("")
        this.pathRoutes = pathRoutes

    }

    asReactElement() {
        let regexNames = []
        // ---- plain names
        for (let path in this.pathRoutes) {
            if (path.startsWith(this.regexTag)) {
                regexNames.push(path)
            } else {
                this.navigationIds[path] = uid()
                const newRoute = new NavigationRoute(
                    this.pathRoutes[path] as (() => (RUIBase | ReactElement)), path, this
                )
                this.children.push(newRoute)
            }
        }
        this.navigationIds["[matchable]"] = uid()

        // ---- regex matches
        let regexPathRoutes: any = {}
        let withSubPathArr = []
        for (let regexName of regexNames) {
            let newRegexName = regexName.replace(this.regexTag, "").replace("/*", "")
            withSubPathArr.push(regexName.endsWith("/*"))
            this.navigationIds[newRegexName] = uid()
            regexPathRoutes[newRegexName] = this.pathRoutes[regexName]
        }

        // ---- if any of the path contains /*, set withSubPath true
        let withSubPath = withSubPathArr.includes(true)
        // ---- regex
        if (Object.keys(regexPathRoutes).length !== 0) {
            const newRoute = new NavigationRouteMatchable(regexPathRoutes, withSubPath, this)
            this.children.push(newRoute)
        }

        return createElement(
            NavigationWrapper,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}

export default (pathRoutes: PathRoutes) => new NavigationView(pathRoutes)


export function BrowserRouter(...children: any[]) {
return TagView(RRDBrowserRouter)(...children)
}
