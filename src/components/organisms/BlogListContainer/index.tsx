import { BlogPagenation } from '@/components/molecules/BlogPagenation'
import { BlogCardList } from '../BlogCardList'
import { PropsWithChildren } from 'react'
import { BlogContextProvider } from '@/contexts/BlogList'

type BlogListContainerProps = {
  tag?: string
  keyword?: string
  limit?: number
}

export const BlogListContainer = (
  props: PropsWithChildren<BlogListContainerProps>,
) => {
  const { tag, keyword } = props
  return (
    <BlogContextProvider tag={tag} keyword={keyword}>
      <BlogCardList />
      <BlogPagenation />
    </BlogContextProvider>
  )
}
