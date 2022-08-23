import {RUI} from "../base";
import {Button, List} from "../component";

const JSXButtons = ({num}:any) =>
    <div>
        {num.map((num: number) =>
            <button
                onClick={()=>{
                    console.log(`This is button ${num}`)
                }}
                key={num}>
                {num}
            </button>)}
    </div>

const RUIButtons = RUI(({nums}:any) =>
    List(nums, (num:number) =>
        Button(num)
            .key(num)
            .onClick(() => {
                console.log(`This is button ${num}`)
            })
    )
)


export {}

