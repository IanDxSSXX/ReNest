

export interface ReactUIThemeColorMap {
    first?: keyof ReactUIThemeColor,
    second?: keyof ReactUIThemeColor,
    third?: keyof ReactUIThemeColor,
    forth?: keyof ReactUIThemeColor,
    fifth?: keyof ReactUIThemeColor
}


export interface ReactUIThemeColorLevel {
    light?: string
    standard?: string
    dark?: string
}
// ---- theme
export interface ReactUIThemeColor {
    background?: ReactUIThemeColorLevel,
    foreground?: ReactUIThemeColorLevel,
    primary?: ReactUIThemeColorLevel,
    secondary?: ReactUIThemeColorLevel,
    tertiary?: ReactUIThemeColorLevel,
}

export interface ReactUIThemeFont {

}

export interface ReactUITheme {
    font?: ReactUIThemeFont,
    colors?: ReactUIThemeColor
}

export interface ReactUIThemeMap { [key: string]: ReactUITheme }
