import Loading from '@components/Loading/Loading'
import Repos from '@components/Repos/Repos'
import Search from '@components/Search/Search'
import styles from '@/App.module.scss'
import useAxiosData from '@/hooks/useAxiosData'

export default function () {
  const { data, loading } = useAxiosData()

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.wrapper}>
      <Search />
      <Repos data={data} />
    </div>
  )
}
