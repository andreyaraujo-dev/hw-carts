import { HttpClient } from '@/shared/services/http-client/http-client'
import { AxiosRequestHeaders } from 'axios'
import { getSession } from 'next-auth/react'
import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'

export class ApiHttpClientService extends HttpClient {
  constructor() {
    super('')
  }

  protected async getHeaders(
    defaultHeaders?: AxiosRequestHeaders
  ): Promise<AxiosRequestHeaders> {
    const session = await getSession()
    let access_token = ''
    if (session && session.user) {
      access_token = `Bearer ${session.access_token}`
    }
    const authorization = access_token ? access_token : ''
    await this.setup()
    return {
      Authorization: authorization
    } as AxiosRequestHeaders
  }

  private async setup() {
    const envService = EnvironmentService.Instance
    this.globalConfig.baseURL = envService.get(ENV_KEY_NAME.nextPublicApiUrl)
  }
}
