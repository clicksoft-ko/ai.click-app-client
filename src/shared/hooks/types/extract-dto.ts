export type ExtractDto<T> = T extends { dto: infer U } ? U : never;
export type ExtractResult<T> = T extends { result: infer U } ? U : never;