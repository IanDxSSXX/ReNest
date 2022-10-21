import {FuncView, View, ViewWrapper} from "@renest/renest";
import {VStack} from "../../component";


class ImageDisplay extends View {
    Body = () =>
        VStack("dfa")
}

export default ViewWrapper(ImageDisplay)
