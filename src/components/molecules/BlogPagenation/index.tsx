import { IconArrowLeft, IconArrowRight } from '@/components/atoms/Icon'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'
import { useBlogContext } from '@/contexts/BlogList'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 200px
  `

const PagingButton = styled.div`
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    width: 70px;
    text-align: center;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: white;
      border-radius: 5px;
      background-color: black;
    }
  `

export const BlogPagenation = () => {
  const [prevCursorId, setPrevCursorId] = useState<number>()
  const [nextCursorId, setNextCursorId] = useState<number>()

  const { isLoading, mutatePage, blogs } = useBlogContext()

  useEffect(() => {
    setPrevCursorId(blogs.at(0)?.id)
    setNextCursorId(blogs.at(blogs.length - 1)?.id)
  }, [blogs, blogs.length])

  const prevPaging = async () => {
    if (prevCursorId) {
      mutatePage({ pagenationDirection: 'prev', cursorBlogId: prevCursorId })
    }
  }
  const nextPaging = async () => {
    if (nextCursorId) {
      mutatePage({ pagenationDirection: 'next', cursorBlogId: nextCursorId })
    }
  }

  return (
    <Flex marginTop={2} justifyContent="center">
      {isLoading == false && (
        <Container>
          <PagingButton onClick={prevPaging}>
            <IconArrowLeft />
          </PagingButton>
          <Box width="100px" />
          <PagingButton onClick={nextPaging}>
            <IconArrowRight />
          </PagingButton>
        </Container>
      )}
    </Flex>
  )
}
