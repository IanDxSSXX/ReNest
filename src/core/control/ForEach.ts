// ---* for each
import RTBase from "../base/RTBase";
import {ReactElement} from "react";

export default <T=any>(arr: T[], callback: (item: T, idx: number) => RTBase | ReactElement) =>
    arr.map((value, index) => callback(value as T, index))