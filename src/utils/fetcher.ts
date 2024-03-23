import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'

export type FetcherBuildOptions = {
  headers?: any
}

export const buildFetchClient = (options?: CreateAxiosDefaults) => {
  const defaultOptions: CreateAxiosDefaults = {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (options) {
    Object.assign(defaultOptions, options)
  }

  return axios.create(defaultOptions)
}

const client = buildFetchClient()

export const buildFetcher = (client: any) => {
  return async (url: string, config: AxiosRequestConfig = {}): Promise<any> => {
    try {
      config.url = url
      const res = await client.request(config)
      return res.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`Failed request by axios: ${err.message}`)
        throw err
      } else {
        console.log(`Failed request by unknown error: ${err}`)
        throw err
      }
    }
  }
}

export const fetcher = buildFetcher(client)
