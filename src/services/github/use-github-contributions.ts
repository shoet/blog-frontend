import { GitHubContributions } from '@/types/api'
import { buildFetchClient, buildFetcher } from '@/utils/fetcher'
import useSWR from 'swr'

export const useGitHubContributions = () => {
  const apiEndpoint = `${import.meta.env.VITE_API_BASE_URL}/github/contributions_latest_week`
  const fetcherClient = buildFetchClient({
    params: {
      username: 'shoet',
      num_of_latest_week: 50,
    },
  })
  const fetcher = buildFetcher(fetcherClient)
  const {
    data: contributions,
    isLoading,
    error,
  } = useSWR<GitHubContributions[]>(apiEndpoint, fetcher)

  return {
    contributions: contributions || [],
    isLoading,
    error,
  }
}
