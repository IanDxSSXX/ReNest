import ReactDOM from "react-dom/client";
import ReactUIApp from "./dev/ReactUIApp";
import {BrowserRouter} from "./core/navigation/ReactUINavigation";
import {Div} from "./core/utils/HTMLTags";
import {ContextProvider, ForEach, FuncView} from "./core";
import {Button} from "./component";

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

