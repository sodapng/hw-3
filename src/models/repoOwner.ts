export type RepoOwnerApi = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export type RepoOwnerModel = {
  id: number
  login: string
  avatarUrl: string
  htmlUrl: string
}

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
  id: from.id,
  login: from.login,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
})
