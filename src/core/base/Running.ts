class Running {
    ContextStore: {[key:string]: {[key:string]: any}} = {}
    ThemeStore: {[key:string]: {themes: {[key: string]: any}, themeName: string}} = {}
    DebugStore: {[key:string]: any} = {}
}


export default new Running()