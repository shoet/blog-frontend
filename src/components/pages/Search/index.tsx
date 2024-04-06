import { Badge } from '@/components/atoms/Badge'
import { Text } from '@/components/atoms/Text'
import Box from '@/components/layout/Box'
import { BlogListContainer } from '@/components/organisms/BlogListContainer'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type SearchType = 'tag' | 'keyword'
type SearchProps = {
  type: SearchType
  key: string
}

export const SearchPage = () => {
  const [search, setSearch] = useState<SearchProps>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('tag') !== null) {
      setSearch({ type: 'tag', key: searchParams.get('tag') ?? '' })
    }
    if (searchParams.get('keyword') !== null) {
      setSearch({
        type: 'keyword',
        key: searchParams.get('keyword') ?? '',
      })
    }
  }, [searchParams])

  const tag = searchParams.get('tag') ?? undefined
  const keyword = searchParams.get('keyword') ?? undefined

  return (
    <>
      <Box marginBottom={2}>
        <Text
          fontSize="large"
          color="gray"
          key={search?.key}
        >{`Searched by ${search?.type}: `}</Text>
        {search?.type === 'tag' ? (
          <Badge>{search.key}</Badge>
        ) : (
          <Badge backgroundColor="pink">{search?.key}</Badge>
        )}
      </Box>
      {search?.type === 'tag' ? (
        <BlogListContainer tag={tag} />
      ) : search?.type === 'keyword' ? (
        <BlogListContainer keyword={keyword} />
      ) : null}
    </>
  )
}
