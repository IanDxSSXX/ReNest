import {createElement, ReactElement} from "react";
import {Route, useParams} from "react-router-dom";
import {NavigationView} from "./NavigationView";
import {FragmentView, TagView} from "@renest/renest";

function RouteElement({navigationView, elementFunc, path}: any) {
    let element = elementFunc() as any
    navigationView.children = [element]
    navigationView.passDownTheme()
    navigationView.passDownContext()

    return (element.IAmRT) ? element.key(navigationView.navigationIds[path]).asReactElement() : element
}

export function NavigationRoute(elementFunc: () => any, path: string, navigationView: NavigationView) {
    let ruiElement = TagView(Route)()
    ruiElement.setProps({
        element: createElement(
            RouteElement,
            {elementFunc, navigationView, path}
        ),
        path: path
    })
    return ruiElement
}

function MatchableRouteElement({navigationView, regexPathRoutes}: any) {
    const { value } = useParams();
    let matchedName = null
    for (let name in regexPathRoutes) {
        let regex = new RegExp(name)
        if (regex.test(value as string)) {
            matchedName = name
            break
        }
    }
    let element: any = matchedName === null ? FragmentView : regexPathRoutes[matchedName]
    element = element(value ?? "")

    navigationView.children = [element]
    navigationView.passDownTheme()
    navigationView.passDownContext()

    return (element.IAmRT) ? (element as any).key(navigationView.navigationIds[matchedName??"_"]??"_").asReactElement() : element as ReactElement
}


export function NavigationRouteMatchable(regexPathRoutes: {[key: string]: ((value: string) => any)}, withSubPath: boolean,
                                  navigationView: NavigationView) {
    let ruiElement = TagView(Route)()
    ruiElement.setProps({
        element: createElement(
            MatchableRouteElement,
            {regexPathRoutes, navigationView}
        ),
        path: withSubPath ? ":value/*" : ":value"
    })
    return ruiElement
}


