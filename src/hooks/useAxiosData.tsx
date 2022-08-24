import { AppContext } from '@/AppContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const useAxiosData = () => {
  const [data, setData] = useState<Repositories[]>([])
  const { repo, loading, setLoading } = useContext(AppContext)

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true)

        if (repo) {
          const { data } = await axios.get<Repositories[]>(
            `https://api.github.com/orgs/${repo}/repos`,
            {
              headers: {
                Authorization: 'token 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',
                Accept: 'application/vnd.github+json',
              },
            }
          )

          setData(data)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [repo, setLoading])

  return { data, loading }
}

export default useAxiosData
