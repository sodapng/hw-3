import { RepoOwnerApi, RepoOwnerModel, normalizeRepoOwner } from './repoOwner'

export type RepoItemApi = {
  id: number
  name: string
  stargazers_count: number
  updated_at: string
  owner: RepoOwnerApi
}

export type RepoItemModel = {
  id: number
  name: string
  stargazersCount: number
  updatedAt: Date
  owner: RepoOwnerModel
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
  owner: normalizeRepoOwner(from.owner),
})
