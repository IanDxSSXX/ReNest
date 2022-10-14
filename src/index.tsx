import ReactDOM from "react-dom/client";
import ReactUIApp from "./dev/ReactUIApp";
import {BrowserRouter} from "./base/navigation/ReactUINavigation";
import {RUI, uid, useRUIState} from "./base";
import {Button, Paper, Text, VStack, ZStack} from "./component";
import {createElement, memo, useEffect, useMemo, useRef, useState} from "react"
import {ReactUIHelper} from "./base/utils/ReactUIHelper";
import {ReactUIElement} from "./base/element/ReactUIElement";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () =>
    BrowserRouter(
        ReactUIApp()
    ).asReactElement()


root.render(
    App()
);
