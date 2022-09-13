import { appStore } from '@/store/AppStore'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import SearchSvg from '@/components/Search/search.svg'
import styles from '@/components/Search/Search.module.scss'

export default observer(function () {
  const { query, setQuery, onSearch, reset } = appStore

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return

      reset()
      onSearch()
    },
    [onSearch, reset]
  )

  const onClick = useCallback(() => {
    reset()
    onSearch()
  }, [onSearch, reset])

  return (
    <div className={styles.search}>
      <input
        autoFocus={true}
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Введите название организации"
        className={styles.search__input}
      />
      <button onClick={onClick} className={styles.search__button}>
        <SearchSvg />
      </button>
    </div>
  )
})
