import { IconArrowLeft, IconArrowRight } from '@/components/atoms/Icon'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'
import { useBlogContext } from '@/contexts/BlogList'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 200px
  `

const enableStyle = css`
    transition: all 0.1s ease-in-out;
    &:hover {
      color: white;
      border-radius: 5px;
      background-color: black;
    }
    cursor: pointer;
`

const disableStyle = css`
  color: #bababa;
`

const PagingButton = styled.div<{ disabled: boolean }>`
    font-size: 30px;
    font-weight: bold;
    width: 70px;
    text-align: center;
    ${({ disabled }) => (disabled ? disableStyle : enableStyle)}
  `

export const BlogPagenation = () => {
  const [prevCursorId, setPrevCursorId] = useState<number>()
  const [nextCursorId, setNextCursorId] = useState<number>()

  const { isLoading, mutatePage, blogs, prevEOF, nextEOF, currentCursorId } =
    useBlogContext()

  useEffect(() => {
    setPrevCursorId(blogs.at(0)?.id)
    setNextCursorId(blogs.at(blogs.length - 1)?.id)
  }, [blogs, blogs.length])

  const prevPagingDisabled = currentCursorId === undefined || prevEOF
  const nextPagingDisabled = nextEOF

  const prevPaging = () => {
    if (prevPagingDisabled) return
    if (prevEOF == false && prevCursorId) {
      mutatePage({ pagenationDirection: 'prev', cursorBlogId: prevCursorId })
      window.scrollTo(0, 0)
    }
  }
  const nextPaging = async () => {
    if (nextEOF == false && nextCursorId) {
      mutatePage({ pagenationDirection: 'next', cursorBlogId: nextCursorId })
      window.scrollTo(0, 0)
    }
  }

  return (
    <Flex marginTop={2} justifyContent="center">
      {isLoading == false && (
        <Container>
          <PagingButton onClick={prevPaging} disabled={prevPagingDisabled}>
            <IconArrowLeft />
          </PagingButton>
          <Box width="100px" />
          <PagingButton onClick={nextPaging} disabled={nextPagingDisabled}>
            <IconArrowRight />
          </PagingButton>
        </Container>
      )}
    </Flex>
  )
}
