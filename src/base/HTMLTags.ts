import {ReactUIThemeBase} from "./ReactUITheme";


export function RUITag(element: any, ...children: any[]) {
    return new ReactUIThemeBase(element, ...children).deleteProp("className")
}
// ----
export function Div(...children: any[]) {
    return RUITag("div", ...children)
}

// -----
export function H1(...children: any[]) {
    return RUITag("h1", ...children)
}

export function H2(...children: any[]) {
    return RUITag("h2", ...children)
}

export function H3(...children: any[]) {
    return RUITag("h3", ...children)
}

export function H4(...children: any[]) {
    return RUITag("h4", ...children)
}

export function H5(...children: any[]) {
    return RUITag("h5", ...children)
}

export function H6(...children: any[]) {
    return RUITag("h6", ...children)
}

// ----
export function Span(...children: any[]) {
    return RUITag("span", ...children)
}

export function P(...children: any[]) {
    return RUITag("p", ...children)
}

export function Strong(...children: any[]) {
    return RUITag("strong", ...children)
}

// ----
export function Ul(...children: any[]) {
    return RUITag("ul", ...children)
}

export function Li(...children: any[]) {
    return RUITag("li", ...children)
}

export function Ol(...children: any[]) {
    return RUITag("ol", ...children)
}

export function Dl(...children: any[]) {
    return RUITag("dl", ...children)
}

export function Dt(...children: any[]) {
    return RUITag("dt", ...children)
}

export function Dd(...children: any[]) {
    return RUITag("dd", ...children)
}

// ----
export function Form(...children: any[]) {
    return RUITag("form", ...children)
}

export function Table(...children: any[]) {
    return RUITag("table", ...children)
}

// ----
export function Img(...children: any[]) {
    return RUITag("img", ...children)
}

export function Canvas(...children: any[]) {
    return RUITag("canvas", ...children)
}

// ----
export function A(...children: any[]) {
    return RUITag("a", ...children)
}

export function Button(...children: any[]) {
    return RUITag("button", ...children)
}

export function Input(...children: any[]) {
    return RUITag("input", ...children)
}


