import {
  PagenationDirection,
  useBlogList,
} from '@/services/blogs/use-blog-list'
import { Blog } from '@/types/api'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type BlogContextData = {
  blogs: Blog[]
  isLoading: boolean
  mutatePage: (props: MutateProps) => Promise<void>
}

const BlogContext = createContext<BlogContextData>({
  blogs: [],
  isLoading: false,
  mutatePage: async () => {},
})

export const useBlogContext = () => useContext(BlogContext)

const limit = 2

type BlogContextProviderProps = {
  tag?: string
  keyword?: string
}

type MutateProps = {
  cursorBlogId: number
  pagenationDirection: PagenationDirection
}

export const BlogContextProvider = (
  props: PropsWithChildren<BlogContextProviderProps>,
) => {
  const { children, tag, keyword } = props
  const [cursorBlogId, setCursorBlogId] = useState<number | undefined>()
  const [pagenationDirection, setPagenationDirection] =
    useState<PagenationDirection>('next')

  const { blogs, isLoading, mutate } = useBlogList(
    {
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    },
    { tag, keyword, limit, cursorBlogId, pagenationDirection },
    [],
  )

  const mutatePage = async (props: MutateProps) => {
    const { cursorBlogId, pagenationDirection } = props
    setCursorBlogId(cursorBlogId)
    setPagenationDirection(pagenationDirection)
    await mutate()
  }

  const data: BlogContextData = {
    blogs: blogs,
    isLoading: isLoading,
    mutatePage: mutatePage,
  }
  return <BlogContext.Provider value={data}>{children}</BlogContext.Provider>
}
