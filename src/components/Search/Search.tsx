import SearchSvg from '@/components/Search/search.svg'
import { appStore } from '@/store/AppStore'
import { observer } from 'mobx-react-lite'
import styles from '@/components/Search/Search.module.scss'

export default observer(function () {
  const { query, setQuery, onSearch } = appStore

  return (
    <div className={styles.search}>
      <input
        autoFocus={true}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? onSearch() : undefined)}
        placeholder="Введите название организации"
        className={styles.search__input}
      />
      <button onClick={onSearch} className={styles.search__button}>
        <SearchSvg />
      </button>
    </div>
  )
})
