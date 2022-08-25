import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import axios from 'axios'
import styles from '@/App.module.scss'

export default function () {
  const { owner, repo } = useParams()
  const [data, setData] = useState({} as Repositories)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true)
        const url = `https://api.github.com/repos/${owner}/${repo}`
        const { data } = await axios.get<Repositories>(url, {
          headers: {
            Authorization: 'token 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',
            Accept: 'application/vnd.github+json',
          },
        })

        setData(data)
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
