import { appStore } from '@/store/AppStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '@/components/Loading/Loading'
import Radio from '@/components/Radio/Radio'
import Repos from '@/components/Repos/Repos'
import Search from '@/components/Search/Search'
import TypeRepo from '@/models/typeRepo'
import styles from '@/App.module.scss'

export default observer(function () {
  const { data, fetchData, hasMore, isLoading, type, setType } = appStore
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const type = searchParams.get('type') as TypeRepo
    if (type) setType(type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSearchParams({ type })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  if (isLoading.value) return <Loading />

  return (
    <div className={styles.wrapper}>
      <Search />
      <Radio />
      {!!data.length && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore.value}
          loader={<Loading isScroll={true} />}
          endMessage={
            <p style={{ margin: '10px', textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Repos data={data} />
        </InfiniteScroll>
      )}
    </div>
  )
})
