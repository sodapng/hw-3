import {
  RepoItemApi,
  RepoItemModel,
  normalizeRepoItem,
} from '@/models/repoItem'
import { makeAutoObservable, observable } from 'mobx'
import TypeRepo from '@/models/typeRepo'
import WithBooleanFlag from '@/core/WithBooleanFlag'
import axios, { AxiosRequestHeaders } from 'axios'

const TOKEN = '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'
const BASE_URL = 'https://api.github.com'
const headers: AxiosRequestHeaders = {
  // Authorization: `token ${TOKEN}`,
  Accept: 'application/vnd.github+json',
}

export default class AppStore {
  perPage = 10
  page = 1
  type: TypeRepo = TypeRepo.ALL
  data: RepoItemModel[] = []
  isLoading = new WithBooleanFlag()
  hasMore = new WithBooleanFlag(true)
  query = ''

  constructor() {
    makeAutoObservable(this, {
      data: observable.ref,
    })
  }

  setData = (value: RepoItemModel[]) => {
    this.data = value
  }

  incPage = (value: number) => {
    this.page += value
  }

  setQuery = (value: string) => {
    this.query = value
  }

  setType = (value: TypeRepo) => {
    this.type = value
  }

  onSearch = async () => {
    if (!this.query) return

    this.page = 1
    this.hasMore.setTrue()
    this.isLoading.setTrue()

    try {
      const { data } = await axios.get<RepoItemApi[]>(
        `${BASE_URL}/orgs/${this.query}/repos`,
        {
          headers,
          params: {
            per_page: this.perPage,
            page: this.page,
            type: this.type,
          },
        }
      )

      this.data = data.map((value) => normalizeRepoItem(value))
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading.setFalse()
    }
  }

  fetchData = async () => {
    this.incPage(1)

    const { data } = await axios.get<RepoItemApi[]>(
      `${BASE_URL}/orgs/${this.query}/repos`,
      {
        headers,
        params: {
          per_page: this.perPage,
          page: this.page,
          type: this.type,
        },
      }
    )

    this.data = this.data.concat(data.map((value) => normalizeRepoItem(value)))

    if (data.length < 10) {
      this.hasMore.setFalse()
    }
  }
}

export const appStore = new AppStore()
