import {
  PagenationDirection,
  useBlogList,
} from '@/services/blogs/use-blog-list'
import { Blog } from '@/types/api'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type BlogContextData = {
  blogs: Blog[]
  prevEOF: boolean
  nextEOF: boolean
  isLoading: boolean
  currentCursorId?: number
  mutatePage: (props: MutateProps) => Promise<void>
}

const BlogContext = createContext<BlogContextData>({
  blogs: [],
  prevEOF: false,
  nextEOF: false,
  isLoading: false,
  mutatePage: async () => {},
})

export const useBlogContext = () => useContext(BlogContext)

const limit = 5

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

  const { blogs, isLoading, prevEOF, nextEOF, mutate } = useBlogList(
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
    prevEOF: prevEOF,
    nextEOF: nextEOF,
    isLoading: isLoading,
    mutatePage: mutatePage,
    currentCursorId: cursorBlogId,
  }
  return <BlogContext.Provider value={data}>{children}</BlogContext.Provider>
}
