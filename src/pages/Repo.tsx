import { BASE_URL, headers } from '@/store/AppStore'
import {
  RepoItemApi,
  RepoItemModel,
  normalizeRepoItem,
} from '@/models/repoItem'
import { action } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import WithBooleanFlag from '@/core/WithBooleanFlag'
import axios from 'axios'
import styles from '@/App.module.scss'

type TStore = {
  data: RepoItemModel | null
  isLoading: WithBooleanFlag
  isError: WithBooleanFlag
  fetchData(): Promise<void>
}

export default observer(() => {
  const { owner, repo } = useParams()
  const localStore = useLocalObservable<TStore>(() => ({
    data: null,
    isLoading: new WithBooleanFlag(),
    isError: new WithBooleanFlag(),
    async fetchData() {
      this.isLoading.setTrue()
      try {
        const { data } = await axios.get<RepoItemApi>(
          `${BASE_URL}/repos/${owner}/${repo}`,
          {
            headers,
          }
        )
        this.data = normalizeRepoItem(data)
      } catch (error) {
        this.isError.setTrue()
      } finally {
        this.isLoading.setFalse()
      }
    },
  }))

  useEffect(() => {
    action(() => localStore.fetchData())
  }, [localStore])

  if (localStore.isLoading.value) {
    return <Loading />
  }

  return (
    <div className={styles.center}>
      <h1>
        {owner}/{repo}
      </h1>
    </div>
  )
})
