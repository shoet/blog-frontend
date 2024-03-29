import { ApiContext, Blog } from '@/types/api'
import { fetcher } from '@/utils/fetcher'

export type PutBlogParams = {
  blog: Omit<Omit<Blog, 'created'>, 'modified'>
}

export const putBlog = async (
  context: ApiContext,
  { blog }: PutBlogParams,
  authToken: string,
): Promise<Blog> => {
  const url = `${context.apiBaseUrl}/blogs/${blog.id}`
  return await fetcher(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data: JSON.stringify(blog),
  })
}
