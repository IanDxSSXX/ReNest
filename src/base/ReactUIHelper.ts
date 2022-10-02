export class ReactUIHelper {
   static error(...messages: string[]) {
       throw `ReactUI error: ${messages.join(", ")}`
   }
}