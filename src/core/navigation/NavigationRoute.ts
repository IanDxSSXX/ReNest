import RUIBase from "../base/RUIBase";
import {createElement, memo, ReactElement} from "react";
import {Route, useParams} from "react-router-dom";
import {FragmentView} from "../utils/RUIWrapper";
import {NavigationView} from "./NavigationView";

function RouteElement({navigationView, elementFunc, path}: any) {
    let element = elementFunc() as any
    navigationView.children = [element]
    navigationView.passDownTheme()
    navigationView.passDownContext()

    return (element.IAmRUI) ? element.key(navigationView.navigationIds[path]).asReactElement() : element
}

export class NavigationRoute extends RUIBase {
    constructor(elementFunc: () => (RUIBase | ReactElement), path: string, navigationView: NavigationView) {
        super(Route)
        this.setProps({
            element: createElement(
                RouteElement,
                {elementFunc, navigationView, path}
            ),
            path: path
        })
    }
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

    return (element.IAmRUI) ? (element as RUIBase).key(navigationView.navigationIds[matchedName??"_"]??"_").asReactElement() : element as ReactElement
}

export class NavigationRouteMatchable extends RUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => (RUIBase | ReactElement))}, withSubPath: boolean,
                navigationView: NavigationView) {
        super(Route)

        this.setProps({
            element: createElement(
                MatchableRouteElement,
                {regexPathRoutes, navigationView}
            ),
            path: withSubPath ? ":value/*" : ":value"
        })
    }

}

