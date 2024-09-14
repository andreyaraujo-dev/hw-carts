import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios'

export class HttpClient {
  protected readonly http: AxiosInstance
  protected globalConfig: AxiosRequestConfig = {}

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL
    })
  }

  protected async getHeaders(
    headers?: AxiosRequestHeaders
  ): Promise<AxiosRequestHeaders> {
    return { ...headers } as AxiosRequestHeaders
  }

  async get<ResponseContractType>(
    route: string,
    config?: AxiosRequestConfig | AxiosHeaders
  ): Promise<AxiosResponse<ResponseContractType>> {
    const authHeaders = await this.getHeaders(config?.headers)
    config = {
      ...config,
      ...this.globalConfig,
      headers: { ...authHeaders, ...config?.headers }
    }
    return this.http.get(route, config)
  }

  async post<RequestContractType, ResponseContractType>(
    route: string,
    data: RequestContractType,
    config?: AxiosRequestConfig | AxiosHeaders
  ): Promise<AxiosResponse<ResponseContractType>> {
    const authHeaders = await this.getHeaders(config?.headers)
    config = {
      ...config,
      ...this.globalConfig,
      headers: { ...authHeaders, ...config?.headers }
    }

    return this.http.post(route, data, config)
  }

  async put<RequestContractType, ResponseContractType>(
    route: string,
    data: RequestContractType,
    config?: AxiosRequestConfig | AxiosHeaders
  ): Promise<AxiosResponse<ResponseContractType>> {
    const authHeaders = await this.getHeaders(config?.headers)
    config = {
      ...config,
      ...this.globalConfig,
      headers: { ...authHeaders, ...config?.headers }
    }
    return this.http.put(route, data, config)
  }

  async patch<RequestContractType, ResponseContractType>(
    route: string,
    data: RequestContractType,
    config?: AxiosRequestConfig | AxiosHeaders
  ): Promise<AxiosResponse<ResponseContractType>> {
    const authHeaders = await this.getHeaders(config?.headers)
    config = {
      ...config,
      ...this.globalConfig,
      headers: { ...authHeaders, ...config?.headers }
    }
    return this.http.patch(route, data, config)
  }

  async delete<ResponseContractType>(
    route: string,
    config?: AxiosRequestConfig | AxiosHeaders
  ): Promise<AxiosResponse<ResponseContractType>> {
    const authHeaders = await this.getHeaders(config?.headers)
    config = {
      ...config,
      ...this.globalConfig,
      headers: { ...authHeaders, ...config?.headers }
    }
    return this.http.delete(route, config)
  }
}
