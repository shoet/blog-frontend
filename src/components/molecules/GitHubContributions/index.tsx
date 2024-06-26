import { GitHubContributions } from '@/types/api'
import styled from 'styled-components'

type GitHubContributionsProps = {
  contributions: GitHubContributions[]
}

const ContributionTile = styled.div<{ color: string }>`
  width: 0.7rem;
  height: 0.7rem;
  ${({ color }) => `background-color: ${color};`}
  border: none;
  border-radius: 20%;
`

const ContributionColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ContributionColumn = (props: { contribution: GitHubContributions }) => {
  const { contribution } = props
  return (
    <ContributionColumnContainer>
      {contribution.contributionDays.map((cd, idx) => {
        return (
          <div
            key={idx}
            style={{
              paddingBottom:
                contribution.contributionDays.length - 1 === idx
                  ? '0'
                  : '0.1rem',
            }}
          >
            <ContributionTile color={cd.color}></ContributionTile>
          </div>
        )
      })}
    </ContributionColumnContainer>
  )
}

const GitHubContributionsRow = styled.div`
  &::-webkit-scrollbar{
    display: none;
  }
  display: flex;
  flex-direction: row;
  justify-content: end;
  overflow-x: scroll;
  padding: 0 0.5rem;
`

export const GitHubContributionsGrid = (props: GitHubContributionsProps) => {
  const { contributions } = props

  return (
    <>
      <a href="https://github.com/shoet" target="_black">
        <GitHubContributionsRow style={{ backgroundColor: '' }}>
          {contributions.map((c, idx) => {
            return (
              <div
                key={idx}
                style={{
                  marginLeft: 0 === idx ? '0' : '0.1rem',
                }}
              >
                <ContributionColumn contribution={c} />
              </div>
            )
          })}
        </GitHubContributionsRow>
      </a>
    </>
  )
}
