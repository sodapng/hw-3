import {
  RepoItemApi,
  RepoItemModel,
  normalizeRepoItem,
} from '@/models/repoItem'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import axios from 'axios'
import styles from '@/App.module.scss'

export default function () {
  const { owner, repo } = useParams()
  const [data, setData] = useState<RepoItemModel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true)
        const url = `https://api.github.com/repos/${owner}/${repo}`
        const { data } = await axios.get<RepoItemApi>(url, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })

        setData(normalizeRepoItem(data))
      } catch (error) {
        console.error('Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [owner, repo])

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.center}>
      <h1>
        {owner}/{repo}
      </h1>
    </div>
  )
}
