// Do not add any other lines of code to this file!
import '@total-typescript/ts-reset'

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

declare global {
  interface ObjectConstructor {
    keys<T extends object>(o: T): (keyof T)[]
  }
}
