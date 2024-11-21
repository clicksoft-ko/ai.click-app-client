export class RandomUtil {
  static getRandomId(): string {
    return import.meta.env.DEV
      ? Math.random().toString(36).substring(2, 15)
      : crypto.randomUUID();
  }
}
