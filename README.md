# 🪶 ReactUI
A react add-on to write React just like SwiftUI.

* ✨ Write function components like React function components with original react hooks
* 🎨 Write class components just like SwiftUI, element and modern
* 🐳 Pure relative layout, offering components like VStack/HStack/ZStack/Spacer
* ⚡️ Partial re-render by default
* 🌐 Powerful contexts that enables passing props through multiple levels of components
* ⌨️ More features like Navigation, Theme, ...

## 📦 Install
`npm install @iandx/reactui`
## ❓ What brings ReactUI?
* React is a great framework, and function hooks make it even more elegant.
  But not HTML or CSS! It's 2022! React uses jsx to replace the ugly HTML and CSS, but......
  What the difference between JSX and HTML! Why can't we code modern? 

* That was what in my mind when I first used SwiftUI back in 2019. Though it was(and is still) just a toy 
  and though I've heard its idea was exactly from React, still, it's modern and elegant. 
  So why don't we take a little bit back to React? Here comes ReactUI...

* Here is an example to create a list of buttons using jsx and reactui

### Comparison

* JSX
  ```typescript jsx
  const JsxButtons = ({nums}:{nums:number[]}) => {
    let [toggle, setToggle] = useState(false)
    
    return (
      <div>
        {nums.map((num: number) => 
          <button 
            onClick={()=>{
              console.log(`This is button ${num}`)
              setToggle(pre=>!pre)      
            }}
          >
            {num}
          </button>)}
      </div>
    )
  }
  
  ```
  
* ReactUI as function
  ```typescript
  const RUIFuncButtons = FuncView(({nums}:{nums:number[]}) => {
    let [toggle, setToggle] = useState(false)

    return (
      List(nums, (num:number) =>
        Button(num)
          .onClick(() => {
            console.log(`This is button ${num}`)
            setToggle(pre=>!pre)
          })
      )
    )
  })
  ```
  Except the way ReactUI sets props, everything is the same with React functions.

* SwiftUI

  ``` swift
  struct SwiftButtons: View {
    var nums: [Int]
    @State toggle = false
    
    var body: some View {
      List(this.nums) { num in 
        Button(num) {
          print("This is button \(num)")
          this.toggle = !this.toggle
        }
      }
    }
  }
  ```

* ReactUI as class
  ``` typescript
  class RUIClassButtons extends View {
    @Prop nums: number[]
    @State toggle = false
    
    Body = () => 
      List(this.nums, (num:number) =>
        Button(num)
          .onClick(() => {
            console.log(`This is button ${num}`)
            this.toggle.setValue(pre=>!pre)
          })
      )
  }
  ```

* Basically every prop in React and CSSProperty can be used in ReactUI as 'dot' function, and IDEs will autocomplete for you!
* if there's some specific properties from third-party components, use `setProp(key, value)`to set additional prop

```typescript
const MyText = FuncView(() =>
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
* try ReactUI in [codesandbox](https://codesandbox.io/s/cool-boyd-1w8rr1?file=/src/App.tsx)
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
import {FuncView} from "@iandx/reactui";
import {Text, Button, VStack} from "@iandx/reactui/component";
import {useState} from "react";

const MyComponent = FuncView(({defaultNum}: any) => {
  let [num, setNum] = useState(defaultNum)
  return (
      Button(num)
        .onClick(()=>{setNum(num+1)})
  )
})

const ReactUIApp = FuncView(() =>
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
  const MySecondComponent = FuncView(() =>
      VStack(
          Text("This is ReactUI"),
          React.createElement("p", null, "This is React"),
          <p>This is JSX</p>
      )     
  )
  ```

* but we **strongly** suggest you to use **pure** ReactUI for additional features, use `TagView/ElementView` to wrap your React Components

## 🤖 Useful Features

### TagView
* Turn every react component into reactui instance no matter if it's a custom react function or a html tag

```typescript
const RUIDiv = TagView("div")()
const RUIComponent = TagView(YourReactFunction)()
```
### ElementView
* Turn a react component instance to reactUI instance

```tsx
const myJSX = <div>hello</div>
const RUIInstance = ElementView(myJSX)()
```
### ConditionView
* Use this view to build a dynamic controllable page **simple and fast**.

```typescript
const MyCondition = FuncView(() => {
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
* Using react-router 6, the `NavigationView` in ReactUI is pretty easy to use and **supports regex path**
  (which react-router 6 doesn't).

```typescript
const MyPage = FuncView(() =>
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
## 🔆 Advanced

* This is the part where we write react like SwiftUI and get to know some **cool** features!

### Class Component

* A reactui class component looks like this

  ```typescript
  // extends View to write a class component
  class Counter extends View {   
    // @Prop is a decorator, it means Counter component takes an optional prop startNum with default value 0
    // so when you use this component, call => Counter() or Counter({startNum: 100})
    @Prop startNum: number = 0    
    // another two decorators: @State and @Callback
    // @State means in Body, you can use this property as a state variable in react hook
    // so { @State count = 1 } visually equals to { [count.value, count.setValue] = useState(1) }
    // @Callback takes another decorator as its argument
    // if we did't use @Callback, { @State count = this.startNum } would always equal to { @State count = 0 } because 0 is startNum's default value
    // so we use @Callback to get the updated value(set as prop from outside) in Body
    @Callback(State) count: any = () => this.startNum
   
    // the Body is just a clousure property, you can always do any logical things in Body to make it look like a function component and use any react hooks as you want, but that would miss the point to code elegantly
    Body = () =>
      VStack(
        HStack(
          Button("+")
            .onClick(() => {
              this.count.setValue((pre:any)=>pre+1)
            }),
          Button("-")
            .onClick(() => {
              this.count.setValue((pre:any)=>pre-1)
            })
          )
            .spacing("20px"),
        Text(this.count.value),
        Button("clear")
          .onClick(() => {
            this.count.value = this.startNum
          })
      )
        .alignment("center")
  }
  
  export default ViewWrapper<{startNum?: number}>(Counter)
  ```

* decorators
  1. `@Ref text = "ok"` <=> `let text = useRef("ok")`
  2. `@State count = 1` <=> `[count.value, count.setValue] = useState(1)`
  3. `@Hook(useAnyHook) value = "default"` <=>  `let value = useAnyHook("default")`
  4. `@SHook(useMultiProps) value = ["prop1", "prop2"]` <=> `let value = useMultiProps("prop1", "prop2")`
  5. `@Prop myProp: string` => call `MyComponent({myProp: "fine"})`
  6. `@DotProp myDotProp: string` => call `MyComponent().myDotProp("any value")`

### ContextProvider

* Use ContextProvider in ReactUI to manage global states simple and powerful.
* Use `@Context` to destructure the whole context into a specific variable
* Use `@Contexts` to get the **whole context**

```typescript
import {ContextProvider, ViewWrapper, View} from "@iandx/reactui";
class ComponentA extends View {
  @Context myFirstState: any
  
  Body = () =>
    VStack(
      Text(`Current first state value is ${contexts.myFirstState.value}`),
      Button("add")    // click this will update the context
        .onClick(() => {
          myFirstState.value += 1
        })
    )
}

const ComponentAView = ViewWrapper(ComponentA)

class MyComponentWithContext extends View {
  @State myFirstState: any = 0
  
  Body = () =>
    ContextProvider(
      VStack(
        ComponentAView()
      )
    )
      .context({myFirstState: this.myFirstState})
}

````

### ThemeProvider

* Use `ThemeProvider` as a global state to manage any theme ralated props

1. Theme in class component

```typescript
class Paper extends View {
  defaultTheme = {
    bg: "#FBFCFC",
    shadow: "#E1E5E4"
  }

  Body = () =>
    Div()
      .backgroundColor(this.theme.bg)
      .width("200px")
      .height("280px")
      .borderRadius("7px")
      .boxShadow(`2px 2px 4px 1px ${this.theme.shadow}`)
}

export default ViewWrapper(Paper)
```

or

``` typescript
class Paper extends View {
  defaultThemes = {
    gray: {
      bg: "#FBFCFC",
      shadow: "#E1E5E4"
    },
    red: {
      bg: "#F1B1B1",
      shadow: "#832525"
    }
  }
  defaultThemeName = "gray"

  Body = () =>
    Div()
      .backgroundColor(this.theme.bg)
      .width("200px")
      .height("280px")
      .borderRadius("7px")
      .boxShadow(`2px 2px 4px 1px ${this.theme.shadow}`)
}

export default ViewWrapper(Paper)

// call to use red theme
Paper()
  .themeName("red")
```

2. `ThemeProvider`

```typescript
class MyComponentWithContext extends View {
  // default using class name(in this case is Paper) to set different theme for different class
  // if you don't want some class to be polluted, use a themeTag() to add a appendix(in this case is Paper_another)
  // @Theme in hook equals to useTheme(themes, initialThemeName)
  @Theme themeState = [{
    firstTheme: {
      Paper: {
        bg: "#118811",
        shadow: "#AAAA00"
      }
    },
    secondTheme: {
      Paper: {
        bg: "#22FFAA",
        shadow: "#997700"
      },
      Paper_another: {
        bg: "#22FFAA",
        shadow: "#997700"
      },
    }
  }, "secondTheme"]  // set initial theme as secondTheme
  
  Body = () =>
    ThemeProvider(
      VStack(
        Paper(),
        Paper()
          .themeTag("another")  // only have secondTheme, when themeName == firstTheme, using defeaultTheme inside Paper class
        Button("change theme")
          .onClick(() => {
            // use themeState.is("xx") to check current theme name
            // use themeState.themeName to get current theme name
            // use themeState.to("xx") to change theme
            if (this.themeState.is("firstTheme")) {
              this.themeState.to("secondTheme")
            } else {
              this.themeState.to("firstTheme")
            }
          })
      )
    )
      .themes(themeState)
}
```

### Lifecycle

* React function uses `useEffect ` to handle lifecycles, so you can still use it (remember, class's Body is **nothing but a react function component**, but we don't write any logical code blocks in Body for the sake of **love**)
* So ReactUI handles lifecycles this way (and adds a strong feature: **component wise lifecycles**)

```typescript
class SubComponent extends View {  
  Body = () =>
    Text("not related to MainComponent's states")
}

const SubComponentView = ViewWrapper(CoSubComponentmponentA)

class MainComponent extends View {
  @State toggle: any = false
  
  Body = () =>
    VStack(
      Button("refresh")
        .onClick(() => {
          toggle.setValue(pre=>!pre)
        })
      SubComponentView()
        .didUpdate(() => {
          console.log("re-rendered as subview")  // this will not be called when click refresh button => so called element-wise lifecycle
        })
    )
      .didMount(() => {
        console.log("mounted")
      })
      .didUpdate(() => {
        console.log("re-rendered")
      })
      .willUnmount(() => {
        console.log("will unmount")
      })
      .shouldUpdate((preProps, currProps) => false)  // this equals to React.memo(xx, shouldUpdate)
      .useMemo(false)    // using memo for partial re-render by default, so no need to call this function to disable it, but you can do it anyway
}
```

* Only Component that defined by a `FuncView` or `View` can use lifecycles, tags like Div, P, ... don't have this dot function
* As the example above, remember the lifecycle is VStack and SubComponentView's, not MainComponent's
* If you want to set MainComponent's lifecycle, you can do it this way

```typescript
class SubComponent extends View {  
  Body = () =>
    Text("not related to MainComponent's states")
}

const SubComponentView = ViewWrapper(CoSubComponentmponentA)

class MainComponent extends View {
  @State toggle: any = false
  
  Body = () =>
    VStack(
      Button("refresh")
        .onClick(() => {
          toggle.setValue(pre=>!pre)
        })
      SubComponentView()
    )
    
  lifecycles = {
    didMount: () => {
      console.log("mounted")
    },
    didUpdate: [
      () => {
        console.log("re-rendered at any value")
      }),
      () => {
        console.log("re-rendered at toggle value")
      }, [this.toggle.value])
    ],
    willUnmount: () => {
      console.log("will unmount")
    }),
    shouldUpdate: (preProps, currProps) => false
  }
}
```

## Internal components

#### Props

| name      | prop         | is dot prop | description                                     |
| --------- | ------------ | ----------- | ----------------------------------------------- |
| Button    | title        |             | button title                                    |
|           | disable      | yes         | gray and disable button                         |
| TextField | defaultText  |             | input's text                                    |
|           | placeHolder  | yes         | input's placeHolder and title                   |
|           | variant      | yes         | "outlined" or "underlined", default is outlined |
|           | disable      | yes         | gray and disable text field                     |
|           | autoFocus    | yes         | auto focus this input                           |
|           | onChange     | yes         | callback when input's text changes              |
| Toggle    | defaultValue |             | default toggle value, true or false             |
|           | onChange     | yes         | callback when toggle is toggled                 |
| ...       |              |             |                                                 |

#### Themes

| Button | value in theme | description |
| ------ | -------------- | ----------- |
| Button | ...            |             |

> Tip:  view full examples at src/components as these are internal components written as ReactUI class components.

## Todo List

- [ ] Find a better way to debug and throw error
- [ ] Improve performance

### Components

- [x] VStack/HStack/ZStack
- [x] Button
- [x] Toggle
- [x] TextField
- [x] List
- [x] Pogress
- [ ] Select
- [ ] CheckList
- [ ] AutoComplete

## License

* MIT



