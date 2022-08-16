import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import ReactUIApp from "./dev/ReactUIApp";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        {ReactUIApp().asReactElement()}
    </BrowserRouter>
);
