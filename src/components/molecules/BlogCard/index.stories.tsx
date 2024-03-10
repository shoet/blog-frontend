import { Meta } from '@storybook/react'
import { BlogCard } from '.'
import { Blog } from '@/types/api'

export default {
  title: 'molecules/BlogCard',
  component: BlogCard,
} as Meta<typeof BlogCard>

const blog: Blog = {
  id: 1,
  title: 'title',
  content: 'content',
  authorId: 1,
  description: 'description',
  thumbnailImageFileName: 'https://placehold.jp/150x150.png',
  tags: ['tag1', 'tag2'],
  isPublic: true,
  created: 1710039459,
  modified: 1710039459,
}

export const Default = () => <BlogCard blog={blog} />
