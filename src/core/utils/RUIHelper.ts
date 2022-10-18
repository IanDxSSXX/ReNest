export class RUIHelper {
   static error(...messages: string[]) {
       throw `RUI error: ${messages.join(", ")}`
   }

   static warn(...messages: string[]) {
        console.warn(`RUI warn: ${messages.join(", ")}`)
   }
}