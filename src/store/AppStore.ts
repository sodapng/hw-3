import {
  RepoItemApi,
  RepoItemModel,
  normalizeRepoItem,
} from '@/models/repoItem'
import { makeAutoObservable, observable } from 'mobx'
import TypeRepo from '@/models/typeRepo'
import WithBooleanFlag from '@/core/WithBooleanFlag'
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'

export const BASE_URL = 'https://api.github.com'
export const headers: AxiosRequestHeaders = {
  Accept: 'application/vnd.github+json',
}

export default class AppStore {
  perPage = 10
  page = 0
  type: TypeRepo = TypeRepo.ALL
  data: RepoItemModel[] = []
  isLoading = new WithBooleanFlag()
  isError = new WithBooleanFlag()
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

  reset = () => {
    this.data = []
    this.page = 0
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

    this.isLoading.setTrue()
    this.hasMore.setTrue()
    this.page += 1

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

      if (data.length < this.perPage) {
        this.hasMore.setFalse()
      }
    } catch (error) {
      this.isError.setTrue()
    } finally {
      this.isLoading.setFalse()
    }
  }
}

export const appStore = new AppStore()
