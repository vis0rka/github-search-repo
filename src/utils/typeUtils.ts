import { CreateStyled } from '@emotion/styled'
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface IReactComponentcWithChild {
  children?: React.ReactNode;
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}


export const transientOptions: Parameters<CreateStyled>[1] = {
    shouldForwardProp: (propName: string) => !propName.startsWith('$'),
}