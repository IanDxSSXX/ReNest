import ReactDOM from "react-dom/client";
import Content from "./dev/Content";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () =>
    Content().asReactElement()


root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

