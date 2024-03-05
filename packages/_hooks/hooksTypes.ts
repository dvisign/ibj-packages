import { Dispatch, SetStateAction, ChangeEvent } from "react"

export type UseInputReturnTypes<T> = [T, (_: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]
