// ---* for each
import RUIBase from "../base/RUIBase";
import {ReactElement} from "react";

export default <T=any>(arr: T[], callback: (item: T, idx: number) => RUIBase | ReactElement) =>
    arr.map((value, index) => callback(value as T, index))