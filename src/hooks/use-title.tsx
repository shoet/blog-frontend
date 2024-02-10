import { APP_PAGE_TITLE } from '@/constant'
import { useEffect } from 'react'

export const useTitle = (title: string, prevTitle: string = APP_PAGE_TITLE) => {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = prevTitle
    }
  }, [title])
}
