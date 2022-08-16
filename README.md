<h1 style="text-align: center">🪶 ReactUI</h1>
<p style="text-align: center">A simple react add-on for you to write React like SwiftUI.</p>

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
import {RUI, Text, Button, useRUIState} from "@iandx/reactui";

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


<table border="0">
 <tr>
    <td><b style="font-size:30px">Title</b></td>
    <td><b style="font-size:30px">Title 2</b></td>
 </tr>
 <tr>
    <td>Lorem ipsum ...</td>
    <td>Lorem ipsum ...</td>
 </tr>
</table>
