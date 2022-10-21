# 🪺 ReNest
Let SwiftUI nests in React.

* ✨ Write function components like React function components with original react hooks
* 🎨 Write class components just like SwiftUI, elegant and modern
* ⚡️ Partial re-render by default
* 🌐 Powerful contexts that enables passing props through multiple levels of components
* ⌨️ More features like Theme, Navigation; components like VStack/HStack/ZStack/Spacer; intergrating with React Native, EXPO, Taro ...

## 📦 Install
`npm install @renest/renest`
## ❓ What brings ReNest?
* React is a great framework, and function hooks make it even more elegant.
  But not HTML or CSS! It's 2022! React uses jsx to replace the ugly HTML and CSS, but......
  What the difference between JSX and HTML! Why can't we code modern? 

* That was what in my mind when I first used SwiftUI back in 2019. Though it was(and is still) just a toy 
  and though I've heard its idea was exactly from React, still, it's modern and elegant. 
  So why don't we take a little bit back to React? Here comes ReNest...

* Here is an example to create a list of buttons using react functional jsx/swiftui/renest

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
              setToggle(prev=>!prev)      
            }}
          >
            {num}
          </button>)}
      </div>
    )
  }
  
  ```
  
* ReNest as function
  ```typescript
  const RTFuncButtons = FuncView(({nums}:{nums:number[]}) => {
    let [toggle, setToggle] = useState(false)
  
    return (
      List(nums, (num:number) =>
        Button(num)
          .onClick(() => {
            console.log(`This is button ${num}`)
            setToggle(prev=>!prev)
          })
      )
    )
  })
  ```
  Except the way ReNest sets props, everything is the same with React functions.

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

* ReNest as class
  ``` typescript
  class RTClassButtons extends View {
    @Prop nums: number[]
    @State toggle = false
    
    Body = () => 
      List(this.nums, (num:number) =>
        Button(num)
          .onClick(() => {
            console.log(`This is button ${num}`)
            this.toggle = !this.toggle
          })
      )
  }
  ```

* Basically every prop in React and CSSProperty can be used in ReNest as 'dot' function, and IDEs will autocomplete for you!
* if there's some specific properties from third-party components, use `setProp(key, value)`to set additional prop

## ⚡️ Quick Start
* try ReNest in [codesandbox](https://codesandbox.io/s/cool-boyd-1w8rr1?file=/src/App.tsx)
```typescript
// ---- src/App.tsx
import RTApp from 'RTApp';
function App() {
  return RTApp().asReactElement()
}

export default App;
```

```typescript
// ---- src/RTApp.ts
import {FuncView} from "@renest/renest";
import {Text, Button, VStack} from "@renest/component";
import {useState} from "react";

const MyComponent = FuncView(({defaultNum}: any) => {
  let [num, setNum] = useState(defaultNum)
  return (
      Button(num)
        .onClick(()=>{setNum(num+1)})
  )
})

const RTApp = FuncView(() =>
  VStack(
      MyComponent({defaultNum: 10}),
      Text("Hello")
  )
    .alignment("center")
)

export default RTApp;
```
* Every ReNest instance can convert to React element using `.asReactElement()`
* Every ReNest instance can take
  1. another ReNest instance
  2. a react element
  3. jsx element
  
  => as its children, e.g.:
  ```typescript jsx
  const MySecondComponent = FuncView(() =>
      VStack(
          Text("This is ReNest"),
          React.createElement("p", null, "This is React"),
          <p>This is JSX</p>
      )     
  )
  ```

* but we **strongly** suggest you to use **pure** ReNest for additional features, use `TagView/ElementView` to wrap your React Components

## 🤖 Useful Features

### TagView
* Turn every react component into ReNest instance no matter if it's a custom react function or a html tag

```typescript
const RTDiv = TagView("div")()
const RTComponent = TagView(YourReactFunction)()
```
* use the second parameter to offer some acceptable dotProp

```typescript
const Button = TagView("button", ["onTap"])
let NewButton = Button("title").onTap("whatever value here will be saved into props when creactElement")

```

### ElementView

* Turn a react component instance to ReNest instance

```tsx
const myJSX = <div>hello</div>
const RTInstance = ElementView(myJSX)()
```
### ConditionView
* Use this view to build a dynamic controllable page **simple and fast**.

```typescript
const MyCondition = FuncView(() => {
    const [displayIdx, setDisplayIdx] = useState(0)
    
    return (
        VStack(
            Button("change")
                .onClick(() => {
                    setDisplayIdx(prev=> prev==2 ? 0 : prev+1)
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
* Using react-router 6, the `NavigationView` in ReNest is pretty easy to use and **supports regex path**
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
## 🔆 Cool Things

* This is the part where we write react like SwiftUI and get to know some **cool** features!

### Class Component

* A ReNest class component looks like this

  ```typescript
  // extends View to write a class component
  class Counter extends View {   
    // @Prop is a decorator, it means Counter component takes an optional prop startNum with default value 0
    // so when you use this component, call => Counter() or Counter({startNum: 100})
    @Prop startNum: number = 0    
    // another two decorators: @State and @Derived
    // @State means in Body, you can use this property as a state variable in react hook
    // so { @State count = 1 } visually equals to { [count.value, count.setValue] = useState(1) }
    // @Derived takes another decorator as its argument
    // if we did't use @Derived, { @State count = this.startNum } would always equal to { @State count = 0 } because 0 is startNum's default value
    // so we use @Derived to get the updated value(set as prop from outside) in Body
    @Derived(State) count: any = () => this.startNum
   
    // the Body is just a clousure property, you can always do any logical things in Body to make it look like a function component and use any react hooks as you want, but that would miss the point to code elegantly
    Body = () =>
      VStack(
        HStack(
          Button("+")
            .onClick(() => {
              this.count ++
            }),
          Button("-")
            .onClick(() => {
              this.count --
            })
          )
            .spacing("20px"),
        Text(this.count),
        Button("clear")
          .onClick(() => {
            this.count = this.startNum
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

* Use ContextProvider in ReNest to manage global states simple and powerful.
* Use `@Context` to destructure the whole context into a specific variable
* Use `@Contexts` to get the **whole context**

```typescript
import {ContextProvider, ViewWrapper, View} from "@renest/renest";
class ComponentA extends View {
  @Context myFirstContext: any
  
  Body = () =>
      Text(`Current first state value is ${this.myFirstContext}`),
}

const ComponentAView = ViewWrapper(ComponentA)

class MyComponentWithContext extends View {
  @State myFirstContext = 0
  
  Body = () =>
    ContextProvider(
      VStack(
        Button("add")
        	.onClick(() => {
            this.myFirstContext
					})
        ComponentAView()
      )
    )
      .context({myFirstContext: this.myFirstContext})
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
  // any view inside ThemeProvider can directly current "myThemes" by using this.themeState to change theme
  @Theme myThemes = [{
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
            // use myThemes.is("xx") to check current theme name
            // use myThemes.themeName to get current theme name
            // use myThemes.to("xx") to change theme
            if (this.myThemes.is("firstTheme")) {
              this.myThemes.to("secondTheme")
            } else {
              this.myThemes.to("firstTheme")
            }
          })
      )
    )
      .useTheme(this.myThemes)
}
```

### Lifecycle

* React function uses `useEffect ` to handle lifecycles, so you can still use it (remember, class's Body is **nothing but a react function component**, but we don't write any logical code blocks inside Body for the sake of **love**)
* So ReNest handles lifecycles this way (and adds a strong feature: **component wise lifecycles**)

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
          this.toggle = !this.toggle
        })
      SubComponentView()
        .didUpdate(() => {
          console.log("re-rendered as subview")  // this will not be called when click refresh button => so called view-wise lifecycle
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
      .shouldUpdate((prevProps, currProps) => false)  // this equals to React.memo(xx, shouldUpdate)
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
  @State toggle = false
  
  Body = () =>
    VStack(
      Button("refresh")
        .onClick(() => {
          this.toggle = !this.toggle
        })
      SubComponentView()
    )
    
  didMount: () => {
    console.log("mounted")
  }
  didUpdate: () => {
    console.log("re-rendered at any value")
  }
  willUnmount: () => {
    console.log("will unmount")
  })
  shouldUpdate: (prevProps, currProps) => false
  
}
```

* `@Observe`: you can use this to observe any prop/dotProp/state

```typescript
class Counter extends View {
  @State count: = 0
  @Observe $count = () => {
    console.log("log this every time click refresh")
  }
  
  Body = () =>
      Button("refresh")
        .onClick(() => {
          this.count ++
        })

  
```

### Converter

* You may need some 3rd ui libraries to provide some off-the-shelf components, to use this, for example, you can simply use `TavView(tag, ...DotPropNames)`. However, if you're using a lot, this is exhausting, now we provide a function called `Converter`, the first prop is a Dict of tags, and the second is dotPropNames

```typescript
const {Div, Button, P, WhateverSpan} = Converter(
{
  Div: "div",
  Button: "button",
  P: "p",
  WhateverSpan: "span"
}, {
  Div: ["goodBye", "look"]
})
```

* Now you can use it anywhere in ReNest

```typescript
let allGood = FuncView(() =>
  Div(
    Button("ok"),
    WhateverSpan("ha")
  )
    .look("don't look at me")
)
```

* Suggest you to write a new file `Convert.ts` which contains all the tag you need, and import it from elsewhere

```typescript
import {Converter} from "@renest/renest";

export const {Div, Button, Span, P} = Converter(
{
    Div: "div",
    Button: "button",
    Span: "span",
    P: "p"
})

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
| ...       |              |             | will be completed soon                          |

#### Themes

| Button | value in theme | description |
| ------ | -------------- | ----------- |
| Button |                |             |

## Todo List

- [x] Find a better way to debug and throw error
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



