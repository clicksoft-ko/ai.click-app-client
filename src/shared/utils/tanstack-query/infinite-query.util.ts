export class InfiniteQueryUtil {
  static getNextPageParam<T>(
    pageSize: number,
    last: T[] | undefined,
    all: T[]
  ): number | null {
    if (!last || last.length < pageSize) {
      return null;
    }

    const nextPage = Math.floor((all.flat().length - 1) / pageSize) + 2;
    return nextPage;
  }
  static select<T extends { pages: any[]; }>(data: T) {
    const result = data.pages?.filter(pg => pg !== undefined).flatMap((pg) => pg);
    return result;
  }
}
