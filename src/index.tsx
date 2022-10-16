import ReactDOM from "react-dom/client";
import ReactUIApp from "./dev/ReactUIApp";
import {BrowserRouter} from "./base/navigation/ReactUINavigation";
import {Div} from "./base/utils/HTMLTags";
import {ContextProvider, ForEach, FuncView} from "./base";
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

