export class RTHelper {
   static throw(...messages: string[]) {
       let err = new Error(messages.join(", "))
       throw err
   }

   static throwEmptyChild(element: any) {
       let name = element.constructor.name
       if (name === "RTElement") name = element.elementTag.name ?? element.elementTag
       RTHelper.throw(`ReactUIElement [${name}] has an empty child, check if prop/dotProp/state/ref value is null/undefined`)
   }

   static warn(...messages: string[]) {
        console.warn(`RT warn: ${messages.join(", ")}`)
   }
}