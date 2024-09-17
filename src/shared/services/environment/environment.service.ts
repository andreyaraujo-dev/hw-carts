import { ENV_KEY_NAME } from '@/shared/services/environment/keys-envs.const'

export class EnvironmentService {
  private static _instance: EnvironmentService
  private readonly variables: Record<string, string>

  private constructor() {
    this.variables = {
      [ENV_KEY_NAME.authUrl]: process.env.AUTH_URL || '',
      [ENV_KEY_NAME.authSecret]: process.env.AUTH_SECRET || '',
      [ENV_KEY_NAME.authGoogleId]: process.env.AUTH_GOOGLE_ID || '',
      [ENV_KEY_NAME.authGoogleSecret]: process.env.AUTH_GOOGLE_SECRET || '',
      [ENV_KEY_NAME.nextPublicApiUrl]: process.env.NEXT_PUBLIC_API_URL || '',
      [ENV_KEY_NAME.jwtSecret]: process.env.JWT_SECRET || ''
    }
  }

  public static get Instance() {
    if (!this._instance) {
      this._instance = new EnvironmentService()
    }
    return this._instance
  }

  public get(key: ENV_KEY_NAME): string {
    return this.variables[key] || ''
  }
}
