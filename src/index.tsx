import ReactDOM from "react-dom/client";
import ReactUIApp from "./dev/ReactUIApp";
import {BrowserRouter} from "./base/navigation/ReactUINavigation";
import {ForEach, FuncView, uid, useRUIState} from "./base";
// import {Button, Paper, Text, VStack, ZStack} from "./component";
import {createElement, memo, useEffect, useMemo, useRef, useState} from "react"
import {ReactUIHelper} from "./base/utils/ReactUIHelper";
import {View} from "./base/element/ReactUIElement";
import {Div, Button} from "./base/utils/HTMLTags";
import {ContextProvider} from "./base/context/ContextProvider";

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


// function TestPerformanceReact() {
//     let arr = Array(50000).fill(0)
//     let t1 = performance.now()
//     let Item = () => {
//         return <button>0</button>
//     }
//     let ReactEl = () =>
//         <div>
//             {arr.map((_,i)=><Item/>)}
//         </div>
//
//     root.render(<ReactEl/>)
//     let t2 = performance.now()
//     console.log(t2-t1)
// }

// function TestPerformanceReactUI() {
//     let arr = Array(50000).fill(0)
//     let t1 = performance.now()
//     let Item = FuncView(() => {
//         return Button("0")
//     })
//     let RUIEl = FuncView(() =>
//         ContextProvider(
//             Div(
//                 ForEach(arr, (_) =>
//                     Item()
//                 )
//             )
//         ).context({arr})
//     )
//
//
//     root.render(RUIEl().asReactElement())
//     let t2 = performance.now()
//     console.log(t2-t1)
// }
//
// TestPerformanceReact()
// TestPerformanceReactUI()