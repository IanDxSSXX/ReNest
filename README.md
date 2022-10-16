# 🪶 ReactUI
A simple react add-on to write React just like SwiftUI.

## 📦 Install
`npm install @iandx/reactui`
## ❓What brings ReactUI?
React is a great framework, and function hooks make it even more elegant.
But not HTML or CSS! It's 2022! React uses jsx to replace the ugly HTML and CSS, but......
What the difference between JSX and HTML! Why can't we code modern? 

That was what in my mind when I first used SwiftUI back in 2019. Though it was(and still) just a toy 
and though I've heard its idea was exactly from React, still, it's modern and elegant. 
So why don't we take a little bit back to React? Here comes ReactUI...

Here is an example to create a list of buttons using jsx and reactui
* JSX
  ```typescript jsx
  const JsxButtons = ({nums}:any) => 
      <div>
          {nums.map((num: number) => 
              <button 
                  onClick={()=>{
                      console.log(`This is button ${num}`)
                  }}
                  key={num}>
                  {num}
              </button>)}
      </div>
  
  ```
* ReactUI
  ```typescript
  const RUIButtons = RUI(({nums}:any) => 
      List(nums, (num:number) =>
          Button(num)
              .key(num)
              .onClick(() => {
                  console.log(`This is button ${num}`)
              })
      )
  )
  ```
Except the way ReactUI sets props, everything is the same with React functions.

Basically every prop in React and CSSProperty can be used in ReactUI as 'dot' function, and IDEs will autocomplete for you!
(if there's some specific properties from third-party components, use `setProp(key, value)`to set additional prop)
```typescript
const MyText = RUI(() =>
    Text("test")
        .fontSize("20px")
        .fontWeight("bold")
        .width("30px")
        .color("red")
        .className("rui-text")
        .id("text-12abc")
        .setProp("other_prop", 123)
)
```
## ⚡️ Quick Start
* try ReactUI in [!codesandbox](https://codesandbox.io/s/cool-boyd-1w8rr1?file=/src/App.tsx)
```typescript
// ---- src/App.tsx
import ReactUIApp from 'ReactUIApp';
function App() {
  return ReactUIApp().asReactElement()
}

export default App;
```

```typescript
// ---- src/ReactUIApp.ts
import ReactUIApp from './ReactUIApp';
import {RUI} from "@iandx/reactui";
import {Text, Button, VStack} from "@iandx/reactui/component";
import {useState} from "react";

const MyComponent = RUI(({defaultNum}: any) => {
  let [num, setNum] = useState(defaultNum)
  return (
      Button(num)
        .onClick(()=>{setNum(num+1)})
  )
})

const ReactUIApp = RUI(() =>
  VStack(
      MyComponent({defaultNum: 10}),
      Text("Hello")
  )
    .alignment("center")
)

export default ReactUIApp;
```
* Every ReactUI instance can convert to React element using `.asReactElement()`
* Every ReactUI instance can take
  1. another ReactUI instance
  2. a react element
  3. jsx element
  
  => as its children, e.g.:
  ```typescript jsx
  const MySecondComponent = RUI(() =>
      VStack(
          Text("This is ReactUI"),
          React.createElement("p", null, "This is React"),
          <p>This is JSX</p>
      )     
  )
  ```

## 🤖 Advanced
### RUITag
Turn every react component into reactui instance no matter if it's a custom react function or a html tag
```typescript
const RUIDiv = RUITag("div")()
const RUIComponent = RUITag(YourReactFunction)()
```
### RUIElement
Turn a react component instance to reactUI instance
```tsx
const myJSX = <div>hello</div>
const RUIInstance = RUIElement(myJSX)()
```
### ConditionView
Use this view to build a dynamic controllable page simple and fast.
```typescript
const MyCondition = RUI(() => {
    const displayIdx = useRUIState(0)
    
    return (
        VStack(
            Button("change")
                .onClick(() => {
                    displayIdx.value = displayIdx.value == 2 ? 0 : displayIdx.value+1
                }),
            ConditionView(displayIdx.value, {
                0: () => Text("This is the default view"),
                1: () => Text("This is view 1"),
                2: () => Text("This is the second view")
            })
        )
    )
})
```
### Router
Using react-router 6, the NavigationView in ReactUI is pretty easy to use and supports regex path
(which react-router 6 doesn't support).
```typescript
const MyPage = RUI(() =>
    VStack(
        Text("this will show whatever the route is"),
        NavigationView({
          "": () => Text("this is home"),
          "what": () =>  Text("this is what"),
          ":abc+": (path: string) => Text(`this matches abcccccc: ${path}`),
          ":": (path: string) => Text(`this matches everything else: ${path}`)
        })
    )
)
```
### ContextProvider
Using ContextProvider in SwiftUI to manage global states simple and powerful.

```typescript
import {ContextProvider} from "@iandx/reactui";
const ComponentA = RUI((props, contexts) =>
  VStack(
    P(`Current first state value is ${contexts.myFirstState.value}`),
    Button("add").onClick(() => {
      contexts.myFirstState.value += 1
    })
  )
)
const MyComponentWithContext = RUI(() => {
  const myFirstState = useRUIState(0)

  return (
    ContextProvider(
      VStack(
        ComponentA()
      )
   ).context({myFirstState})
  )
})
````

context with tag:
```typescript
import {ContextProvider} from "@iandx/reactui";
const ComponentA = RUI((props, {myFirstState}) => // no mySecondState in contexts here
  VStack(
    P(`Current first state value is ${myFirstState.value}`),
    Button("add").onClick(() => {
      myFirstState.value += 1
    })
  )
)
const ComponentB = RUI((props, {myFirstState, mySecondState}) =>
  VStack(
    P(`Current first state value is ${mySecondState.value}`),
    Button("add").onClick(() => {
      mySecondState.value += 1
    })
  )
)
const MyComponentWithContext = RUI(() => {
  const myFirstState = useRUIState(0)
  const mySecondState = useRUIState("")

  return (
    ContextProvider(
      VStack(
        ComponentA(),
        ComponentB()
          .contextTag("tag2")
      )
   ).context({myFirstState})
    .context({mySecondState}, "tag2")
  )
})
````
### Custom ReactUI Element
This part is to show you an advanced usage of how to define a ReactUI Element 
apart from the simple `RUI()` and `RUITag()`.

Here's an example of an internal Button written in ReactUI
```typescript
// ---- src/component/Input/Button.ts
class Button extends View {
  Body = ({title}: any) => {
    const button = TButton(title)
    const mouseState = useRUIState("out")

    button
      .boxSizing("border-box")
      .border("solid")
      .borderRadius("5px")
      .borderWidth("1px")
      .height("max-content")
      .width("max-content")
      .padding("5px 10px")
      .textAlign("center")
      .verticalAlign("middle")
      .userSelect("none")
      .cursor("pointer")
      .backgroundColor(this.theme.bg)
      .color(this.theme.fg)
      .borderColor(this.theme.fg)
      .opacity(mouseState.value === "out" ? "1" : "0.5")
      .onMouseDown(() => {
        mouseState.value = "down"
      })
      .onMouseUp(() => {
        mouseState.value = "out"
      })
      .onMouseOut(() => {
        mouseState.value = "out"
      })

    if (this.C.disable) {
      button.pointerEvents("none").opacity("0.5")
    }

    return button
  }

  // ---- this is custom dot function that can be called outside and be used as this.C.xx in Body
  @RUIProp
  disable(value: boolean=true) {return this}
}
export default function (title: string) {
  return new Button({title})
}
```
### Theme
Use theme in ReactUIElement
```typescript
let themes = {
  primary: {
      bg: "#11AA11",
      shadow: "#AAFF00"
  },
  secondary: {
      bg: "#00AAAA",
      shadow: "#FF66FF"
  }
}

class Paper extends View {
  defaultTheme = themes.primary

  Body = () => {
    const paper = Div()

    return paper
      .backgroundColor(this.theme.bg)
      .width("200px")
      .height("280px")
      .borderRadius("7px")
      .boxShadow(`2px 2px 4px 1px ${this.theme.shadow}`)
  }
}

export default function() {
    return new Paper().themes(themes).themeName("primary")
}

```
`ThemeProvider`
```typescript
import {ThemeProvider} from "@iandx/reactui"
const ComponentWithTheme = RUI(() =>
  ThemeProvider(
    VStack(
      Paper()
        .themeName("primary"),
      Paper()
        .themeName("secondary")
    )
  )
)
```
`useTheme`, use this hook to save theme in contexts and change theme across any component

```typescript
import {ThemeProvider, useTheme} from "@iandx/reactui"

const ComponentA = RUI(({}, {theme}) =>
  Button("click me to change theme")
    .onClick(() => {
      if (!theme.is("myTheme")) {
        theme.to("myTheme")
      } else {
        theme.to("primary")
      }
    })
)
const ComponentWithTheme = RUI(() => {
  let theme = useTheme({
    myTheme: {
      bg: "#22AA11",
      shadow: "#55FF00"
    },
  })
  
  return (
    ThemeProvider(
      VStack(
        Paper()
      )
    ).theme(theme)
  )
})
```
> Tips: Everything that starts with RUI is a **function** and ReactUI a **class**
## Components Todo List
- [x] VStack/HStack/ZStack
- [x] Button
- [x] Toggle
- [x] TextField
- [x] List
- [x] pogress
- [x] Select
- [ ] AutoComplete


