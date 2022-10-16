import ReactUIBase from "../base/ReactUIBase";
import {createElement, ReactElement} from "react";
import {Route, useParams} from "react-router-dom";
import {ReactUITheme} from "../theme/ReactUITheme";
import {FragmentView} from "../utils/ReactUIWrapper";
import {C} from "./ReactUINavigation";

export class NavigationRoute extends ReactUIBase {
    constructor(elementFunc: () => (ReactUIBase | ReactElement), path: string, navigationView: C.NavigationView) {
        super(Route)
        function Element() {
            let element = elementFunc() as any
            if (element.IAmReactUITheme) {
                navigationView.children = [element]
                navigationView.passDownTheme()
                navigationView.children = []
            }

            if (element.IAmReactUIContext) {
                navigationView.children = [element]
                navigationView.passDownContext()
                navigationView.children = []
            }

            return (element.IAmReactUI) ? (element as ReactUIBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: path
        })
    }
}

export class NavigationRouteMatchable extends ReactUIBase {
    constructor(regexPathRoutes: {[key: string]: ((value: string) => (ReactUIBase | ReactElement))}, withSubPath: boolean,
                navigationView: C.NavigationView) {
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
            let element: any = matchedName === null ? FragmentView() : regexPathRoutes[matchedName]
            if (element instanceof Function) {
                element = element(value ?? "")
            }

            if (element.IAmReactUITheme) {
                navigationView.children = [element]
                navigationView.passDownTheme()
                navigationView.children = []
            }

            if (element.IAmReactUIContext) {
                navigationView.children = [element]
                navigationView.passDownContext()
                navigationView.children = []
            }

            return (element.IAmReactUI) ? (element as ReactUIBase).asReactElement() : element as ReactElement
        }

        this.setProps({
            element: createElement(Element),
            path: withSubPath ? ":value/*" : ":value"
        })
    }
}

