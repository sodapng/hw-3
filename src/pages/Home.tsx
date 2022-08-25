import { AppContext } from '@/AppContext'
import { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '@components/Loading/Loading'
import Repos from '@components/Repos/Repos'
import Search from '@components/Search/Search'
import axios from 'axios'
import styles from '@/App.module.scss'
import useAxiosData from '@/hooks/useAxiosData'

export default function () {
  const { data, setData, isLoading } = useAxiosData()
  const { page, setPage, perPage, owner, hasMore, setHasMore } =
    useContext(AppContext)

  const fetchData = async () => {
    setPage(page + 1)

    const { data: newData } = await axios.get<Repositories[]>(
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

    setData(data.concat(newData))

    if (newData.length < 10) {
      setHasMore(false)
    }
  }

  if (isLoading) return <Loading />

  return (
    <div className={styles.wrapper}>
      <Search />
      {!!data.length && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {<Repos data={data} />}
        </InfiniteScroll>
      )}
    </div>
  )
}
