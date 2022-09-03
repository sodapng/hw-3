import {
  RepoItemApi,
  RepoItemModel,
  normalizeRepoItem,
} from '@/models/repoItem'
import { makeAutoObservable, observable } from 'mobx'
import TypeRepo from '@/models/typeRepo'
import WithBooleanFlag from '@/core/WithBooleanFlag'
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'

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
    makeAutoObservable(
      this,
      {
        data: observable.ref,
      },
      { autoBind: true }
    )
  }

  setData = (value: RepoItemModel[]) => {
    this.data = value
  }

  setQuery = (value: string) => {
    this.query = value
  }

  setType = (value: TypeRepo) => {
    this.type = value
  };

  *onSearch(): Generator<
    Promise<AxiosResponse<RepoItemApi[]>>,
    void,
    AxiosResponse<RepoItemApi[]>
  > {
    if (!this.query) return

    this.page = 1
    this.hasMore.setTrue()
    this.isLoading.setTrue()

    try {
      const { data } = yield axios.get(`${BASE_URL}/orgs/${this.query}/repos`, {
        headers,
        params: {
          per_page: this.perPage,
          page: this.page,
          type: this.type,
        },
      })

      this.data = data.map((value) => normalizeRepoItem(value))
    } catch (error) {
      console.error(error)
      this.data = []
    } finally {
      this.isLoading.setFalse()
    }
  }

  *fetchData(): Generator<
    Promise<AxiosResponse<RepoItemApi[]>>,
    void,
    AxiosResponse<RepoItemApi[]>
  > {
    this.page++

    try {
      const { data } = yield axios.get(`${BASE_URL}/orgs/${this.query}/repos`, {
        headers,
        params: {
          per_page: this.perPage,
          page: this.page,
          type: this.type,
        },
      })

      this.data = this.data.concat(
        data.map((value: RepoItemApi) => normalizeRepoItem(value))
      )

      if (data.length < 10) {
        this.hasMore.setFalse()
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const appStore = new AppStore()
