import { GitHubContributionsGrid } from '@/components/molecules/GitHubContributions'
import { useGitHubContributions } from '@/services/github/use-github-contributions'

export const GitHubContributionContainer = () => {
  const { contributions, isLoading, error } = useGitHubContributions()
  return <GitHubContributionsGrid contributions={contributions} />
}
