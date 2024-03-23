import { Meta, StoryObj } from '@storybook/react'
import { GitHubContributionsGrid } from '.'

import { GitHubContributions } from '@/types/api'

const data = `
[
  {
    "contributionDays": [
      {
        "date": "2024-03-17",
        "color": "#40c463",
        "contributionCount": 7
      },
      {
        "date": "2024-03-18",
        "color": "#40c463",
        "contributionCount": 6
      },
      {
        "date": "2024-03-19",
        "color": "#216e39",
        "contributionCount": 17
      },
      {
        "date": "2024-03-20",
        "color": "#40c463",
        "contributionCount": 8
      },
      {
        "date": "2024-03-21",
        "color": "#40c463",
        "contributionCount": 8
      },
      {
        "date": "2024-03-22",
        "color": "#9be9a8",
        "contributionCount": 2
      },
      {
        "date": "2024-03-23",
        "color": "#9be9a8",
        "contributionCount": 1
      }
    ]
  },
  {
    "contributionDays": [
      {
        "date": "2024-03-17",
        "color": "#40c463",
        "contributionCount": 7
      },
      {
        "date": "2024-03-18",
        "color": "#40c463",
        "contributionCount": 6
      },
      {
        "date": "2024-03-19",
        "color": "#216e39",
        "contributionCount": 17
      },
      {
        "date": "2024-03-20",
        "color": "#40c463",
        "contributionCount": 8
      },
      {
        "date": "2024-03-21",
        "color": "#40c463",
        "contributionCount": 8
      },
      {
        "date": "2024-03-22",
        "color": "#9be9a8",
        "contributionCount": 2
      },
      {
        "date": "2024-03-23",
        "color": "#9be9a8",
        "contributionCount": 1
      }
    ]
  }
]
`

export default {
  title: 'molecules/GitHubContributionsGrid',
  component: GitHubContributionsGrid,
} as Meta<typeof GitHubContributionsGrid>

type Story = StoryObj<typeof GitHubContributionsGrid>

const contributions: GitHubContributions[] = JSON.parse(
  data,
) as GitHubContributions[]

export const Basic: Story = {
  args: {
    contributions: contributions,
  },
}
