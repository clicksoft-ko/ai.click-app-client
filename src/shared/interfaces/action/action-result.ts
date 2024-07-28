export interface ActionResult<T> {
  error?: T & { _form?: string };
  success?: boolean;
}