import { IconArrowLeft, IconArrowRight } from '@/components/atoms/Icon'
import Box from '@/components/layout/Box'
import styled from 'styled-components'

type PagenationProps = {
  onClickPrev?: () => void
  onClickNext?: () => void
}

export const Pagenation = (props: PagenationProps) => {
  const { onClickPrev, onClickNext } = props

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

  return (
    <Container>
      <PagingButton>
        <IconArrowLeft />
      </PagingButton>
      <Box width="100px" />
      <PagingButton>
        <IconArrowRight />
      </PagingButton>
    </Container>
  )
}
