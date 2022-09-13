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
  const { data, onSearch, hasMore, isLoading, setType } = appStore
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const type = searchParams.get('type') as TypeRepo
    if (type) setType(type)
  }, [searchParams, setType])

  if (isLoading.value) return <Loading />

  return (
    <div className={styles.wrapper}>
      <Search />
      <Radio />
      {!!data.length && (
        <InfiniteScroll
          dataLength={data.length}
          next={onSearch}
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
