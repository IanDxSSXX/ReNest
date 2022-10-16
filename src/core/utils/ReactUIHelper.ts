export class ReactUIHelper {
   static error(...messages: string[]) {
       throw `ReactUI error: ${messages.join(", ")}`
   }

   static warn(...messages: string[]) {
        console.warn(`ReactUI warn: ${messages.join(", ")}`)
   }
}