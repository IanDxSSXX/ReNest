// ---* for each
import ReactUIBase from "../base/ReactUIBase";
import {ReactElement} from "react";

export default <T=any>(arr: T[], callback: (item: T, idx: number) => ReactUIBase | ReactElement) =>
    arr.map((value, index) => callback(value as T, index))