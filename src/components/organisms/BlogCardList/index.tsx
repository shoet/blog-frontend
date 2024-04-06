import Box from '@/components/layout/Box'
import { BlogCard } from '@/components/molecules/BlogCard'
import { useBlogContext } from '@/contexts/BlogList'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const BlogCardList = () => {
  const { blogs } = useBlogContext()
  return (
    <Container>
      {blogs &&
        blogs.map((b, idx) => (
          <Box key={idx}>
            <NavLink to={`/${b.id}`}>
              <BlogCard blog={b} />
            </NavLink>
          </Box>
        ))}
    </Container>
  )
}
