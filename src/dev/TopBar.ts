import {Hook, View, ViewWrapper} from "@renest/renest";
import {Button, HStack, Paper, ZStack} from "../component";
import {useNavigate} from "react-router-dom";

const Navigate = Hook(useNavigate)

class TopBarView extends View {
    @Navigate nv: any

    Body = () =>
        ZStack(
            Paper()
                .width("600px")
                .height("80px"),
            HStack(
                Button("home")
                    .onClick(() => this.nv("/")),
                Button("text field")
                    .onClick(() => this.nv("/textField")),
                Button("list")
                    .onClick(() => this.nv("/list")),
                Button("toggle")
                    .onClick(() => this.nv("/toggle")),
                Button("progress")
                    .onClick(() => this.nv("/progress")),
                Button("image")
                    .onClick(() => this.nv("/image")),
                Button("context")
                    .onClick(() => this.nv("/context")),
                Button("::::")
                    .onClick(() => this.nv("/12839")),
            ).spacing("10px")
        )

}

export default ViewWrapper(TopBarView)
