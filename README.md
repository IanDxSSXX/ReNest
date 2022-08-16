<h1 style="align: center">🪶 ReactUI</h1>
<p style="align: center">A simple react add-on for you to write React like SwiftUI.</p>

## 📦 Install
`npm install @iandx/reactui`
## ⚡️ Quick Start
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
import ReactUIApp from 'ReactUIApp';
import {RUI, Text, Button, useRUIState, VStack} from "@iandx/reactui";

const MyComponent = RUI(({defaultNum}: any) => {
  let [num, setNum] = useState(defaultNum)
  return (
      Button(num)
        .onChange(()=>{setNum(num+1)})
  )
})

const ReactUIApp = RUI(() =>
  VStack(
      MyComponent({defaultNum: 10}),
      Text("Hello")
  )
    .alignment("center")
)

export default App;
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
## What brings ReactUI?
React is a great framework, and function hooks make it even more elegant.
But not HTML or CSS! It's 2022! React uses jsx to replace the ugly HTML and CSS, but......
What the difference between JSX and HTML! Why can't we code modern? 

That was what in my mind when I first used SwiftUI back in 2019. Though it was(and still) just a toy 
and though I've heard its idea was exactly from React, still, it's modern and elegant. 
So why don't we take a little bit back to React? Here comes ReactUI...

Here is an example to create a list of text using jsx and reactui
* JSX
  ```typescript jsx
  const JsxButtons = ({num}:any) => {
      return (
          <div>
              {num.map((num: number) => 
                  <button 
                      onClick={()=>{
                          console.log(`This is button ${num}`)
                      }}
                      key={num}>
                      num
                  </button>)}
          </div>
      )
  }
  ```
* ReactUI
  ```typescript
  const RUIButtons = RUI(({nums}:any) => {
      return (
          List(nums, (num) =>
              Button(num)
                  .key(num)
                  .onClick(() => {
                      console.log(`This is button ${num}`)
                  })
          )
      )
  })
  ```
Except the way ReactUI sets props, everything is the same with React functions.

Basically every prop in React and CSSProperty can be used in ReactUI as 'dot' function, and IDEs will autocomplete for you!
(if there's some specific properties from third-party components, use `setProp(key, value)`to set additional color)
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
## Advanced
### RUITag
Turn every react component into reactui instance no matter if it's a custom react function or a html tag
```typescript
const RUIDiv = RUITag("div")
const RUIComponent = RUITag(YourReactFunction)
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
                0: Text("This is the default view"),
                1: Text("This is view 1"),
                2: Text("This is the second view")
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
          "": Text("this is home"),
          "what": Text("this is what"),
          ":abc+": (path: string) => Text(`this matches abcccccc: ${path}`),
          ":": (path: string) => Text(`this matches everything else: ${path}`)
        })
    )
)
```
### ThemeView
A pretty strong view wrapper to manage all your customized components, 
the main concepts is: "5 colors are enough for a theme!"

The development and test is already done, but I don't know how to explain 
it in a straight way, so just leave it here....
### Custom ReactUI Element
This part is to show you an advanced usage of how to define a ReactUI Element 
apart from the simple `RUI()` and `RUITag()`.

Here's an example of an internal Button written in ReactUI
```typescript
// ---- src/components/Input/Button.ts
import {ReactUIElement, reactUIProp} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {ReactUIThemeColor} from "../../base/Interfaces";
import {useRUIState} from "../../base/Utils";

class Button extends ReactUIElement {
  Body = ({title}: any) => {
    const button = Div(title).registerBy(this)
    const mouseState = useRUIState("out")

    button
      .boxSizing("border-box")
      .border("solid")
      .borderRadius(button.S.borderRadius ?? "5px")
      .borderWidth(button.S.borderWidth ?? "1px")
      .height(button.S.height ?? "max-content")
      .width(button.S.width ?? "max-content")
      .padding("5px 10px")
      .textAlign("center")
      .verticalAlign("middle")
      .lineHeight(button.S.height === "max-content" ? "" :
              `calc(${button.S.height} - 2 * ${button.S.borderWidth} - 10px`)
      .userSelect("none")
      .cursor("pointer")
      .backgroundColor(this.themeColor.first.dark!)
      .color(this.themeColor.first.light!)
      .borderColor(this.themeColor.first.light!)
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

    if (this.C.disable ?? false) {
      button.pointerEvents("none").opacity("0.5")
    }

    return button
  }

  // ---- these are custom dot function that can be called outside and be used as this.C.xx in Body
  @reactUIProp
  disable(value: boolean=true) {return this}
}

export default function (title: string) {
  return new Button({title})
}
```
## Todo
- [ ] Build an internal component library with theme and animation.
  - [x] VStack/HStack/ZStack
  - [x] Button
  - [x] Toggle
  - [x] TextField
  - [x] List
  - [x] pogress
  - [ ] Select
  - [ ] AutoComplete