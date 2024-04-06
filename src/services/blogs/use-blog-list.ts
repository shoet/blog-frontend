import { ApiContext, Blog } from '@/types/api'
import { parseCookie } from '@/utils/cookie'
import { buildFetchClient, buildFetcher } from '@/utils/fetcher'
import useSWR from 'swr'

export type PagenationDirection = 'prev' | 'next'

type UseBlogListInput = {
  tag?: string
  keyword?: string
  cursorBlogId?: number
  limit?: number
  pagenationDirection?: PagenationDirection
}

type UseBlogListResponse = {
  blogs: Blog[]
}

export const useBlogList = (
  context: ApiContext,
  input: UseBlogListInput = {},
  initial: Blog[] = [],
) => {
  let url = `${context.apiBaseUrl}/blogs`
  const params = new URLSearchParams()
  if (input.tag) {
    params.append('tag', input.tag)
  }
  if (input.keyword) {
    params.append('keyword', input.keyword)
  }
  if (input.cursorBlogId) {
    params.append('cursor_id', input.cursorBlogId.toString())
  }
  if (input.limit) {
    params.append('limit', input.limit.toString())
  }
  if (input.pagenationDirection) {
    params.append('direction', input.pagenationDirection.toString())
  }
  if (Array.from(params).length > 0) {
    url = `${url}?${params}`
  }
  const { data, isLoading, error, mutate } = useSWR<UseBlogListResponse>(url)
  return {
    blogs: data?.blogs || initial,
    isLoading,
    error,
    mutate,
  }
}

export const useBlogListAdmin = (context: ApiContext, initial: Blog[] = []) => {
  const url = `${context.apiBaseUrl}/admin/blogs`
  const token = parseCookie(document.cookie)['authToken']
  const client = buildFetchClient({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const fetcher = buildFetcher(client)
  const { data, isLoading, error, mutate } = useSWR<Blog[]>(url, fetcher)
  return {
    blogs: data || initial,
    isLoading,
    error,
    mutate,
  }
}
