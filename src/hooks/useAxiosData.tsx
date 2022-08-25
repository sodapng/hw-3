import { AppContext } from '@/AppContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const useAxiosData = () => {
  const [data, setData] = useState<Repositories[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { isSending, setIsSending, page, setPage, perPage, owner } =
    useContext(AppContext)

  useEffect(() => {
    void (async () => {
      try {
        if (!isSending) return

        setIsLoading(true)

        const { data } = await axios.get<Repositories[]>(
          `https://api.github.com/orgs/${owner}/repos`,
          {
            headers: {
              Authorization: 'token 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',
              Accept: 'application/vnd.github+json',
            },
            params: {
              per_page: perPage,
              page: page,
            },
          }
        )

        setData(data)
        setPage(page + 1)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      } finally {
        setIsLoading(false)
        setIsSending(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSending])

  return { data, setData, isLoading }
}

export default useAxiosData
