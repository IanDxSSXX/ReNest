import {Routes} from "react-router-dom";
import {createElement, useEffect, useRef} from "react";
import {NavigationRoute, NavigationRouteMatchable} from "./NavigationRoute";
import {BrowserRouter as RRDBrowserRouter} from "react-router-dom";
import {uid} from "../../Util/Utils";
import {RTConfig, TagView, View} from "@renest/renest";

function NavigationWrapper({wrapper}: any) {
    // ---- very important, see notes
    const navigationIds = useRef(null)
    if (navigationIds.current !== null) wrapper.navigationIds = navigationIds.current
    useEffect(() => {
        navigationIds.current = wrapper.navigationIds
    },[])

    RTConfig.debug = false
    let children = wrapper.children.map((child: any)=>
        child.IAmRT ? child.asReactElement() : child)

    RTConfig.debug = true

    return createElement(
        Routes,
        {},
        ...children
    )
}


export interface PathRoutes {
    [key: string]: (value?: string) => any
}

export class NavigationView extends View {
    pathRoutes: PathRoutes
    regexTag = ":"
    navigationIds: {[key:string]: string} = {}
    Body: any

    constructor(pathRoutes: PathRoutes) {
        super()
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
                const newRoute = NavigationRoute(
                    this.pathRoutes[path] as (() => any), path, this
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
            const newRoute = NavigationRouteMatchable(regexPathRoutes, withSubPath, this)
            this.children.push(newRoute)
        }

        return createElement(
            NavigationWrapper,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}

export default (pathRoutes: PathRoutes) => new NavigationView(pathRoutes)


export const BrowserRouter = TagView(RRDBrowserRouter)