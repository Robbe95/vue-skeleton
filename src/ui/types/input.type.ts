export type InputType = 'date' | 'email' | 'number' | 'password' | 'text' | 'time' | 'datetime-local'
export type InputValue<T> = (T extends 'number' ? number : string) | null
