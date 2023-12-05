import { Meta } from '@storybook/react'
import { IconGitHub, IconSearch, IconTwitter, IconYoutube } from '.'

export default {
  title: 'atoms/Icon',
  component: IconGitHub,
} as Meta<typeof IconGitHub>

export const Github = () => <IconGitHub size={24} />
export const Youtube = () => <IconYoutube size={24} />
export const Twitter = () => <IconTwitter size={24} />
export const Searcg = () => <IconSearch size={24} />
