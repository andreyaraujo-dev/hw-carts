export class EnvironmentService {
  private static _instance: EnvironmentService
  private cacheKeys: Record<string, string> = {}

  constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  private setCacheKey(key: string, value: string) {
    this.cacheKeys[key] = value
  }

  private getCacheKey(key: string) {
    return this.cacheKeys[key]
  }

  logAllCache() {
    console.warn('Showing all cache --> ', this.cacheKeys)
  }

  async getKeyVault(key: string) {
    const envCache = this.getCacheKey(key)
    if (envCache) return envCache

    const enValue = process.env[key]
    if (enValue) {
      this.setCacheKey(key, enValue)
      return enValue
    }

    return ''
  }
}
