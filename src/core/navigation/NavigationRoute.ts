import RUIBase from "../base/RUIBase";
import {createElement, ReactElement} from "react";
import {Route, useParams} from "react-router-dom";
import {FragmentView} from "../utils/RUIWrapper";
import {NavigationView} from "./NavigationView";

export class NavigationRoute extends RUIBase {
    constructor(elementFunc: () => (RUIBase | ReactElement), path: string, navigationView: NavigationView) {
        super(Route)
        function Element() {
            let element = elementFunc() as any
            if (element.IAmRUITheme) {
                navigationView.children = [element]
                navigationView.passDownTheme()
                navigationView.children = []
            }

            if (element.IAmRUIContext) {
                navigationView.children = [element]
                navigationView.passDownContext()
                navigationView.children = []
            }

            return (element.IAmRUI) ? (element as RUIBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: path
        })
    }
}

export class NavigationRouteMatchable extends RUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => (RUIBase | ReactElement))}, withSubPath: boolean,
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
            let element: any = matchedName === null ? FragmentView : regexPathRoutes[matchedName]
            element = element(value ?? "")

            if (element.IAmRUITheme) {
                navigationView.children = [element]
                navigationView.passDownTheme()
                navigationView.children = []
            }

            if (element.IAmRUIContext) {
                navigationView.children = [element]
                navigationView.passDownContext()
                navigationView.children = []
            }

            return (element.IAmRUI) ? (element as RUIBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: withSubPath ? ":value/*" : ":value"
        })
    }
}

