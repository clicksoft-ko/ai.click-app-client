type ErrorObject = {
  [key: string]: string[] | undefined | ErrorObject;
};

export const flattenZodError = <T extends object>(error: Zod.ZodError<any>): T => {
  const result: { [key: string]: string | undefined } = {};
  const helper = (obj: ErrorObject, path: string) => {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      if (Array.isArray(value)) {
        result[currentPath] = value.join(", ");
      } else if (value && typeof value === "object") {
        helper(value, currentPath);
      } else {
        result[currentPath] = undefined;
      }
    }
  };

  helper(error.flatten().fieldErrors, "");

  return result as T;
};
