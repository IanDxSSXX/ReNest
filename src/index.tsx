import ReactDOM from "react-dom/client";
import RUIApp from "./dev/RUIApp";
import {BrowserRouter} from "./core/navigation/NavigationView";
import {Div} from "./core/utils/HTMLTags";
import {ContextProvider, ForEach, FuncView, useRUIState} from "./core";
import {Button} from "./component";
import {createElement, useState} from "react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () =>
    BrowserRouter(
        RUIApp()
    ).asReactElement()


root.render(
    App()
);

