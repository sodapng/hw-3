import { AppContext } from '@/AppContext'
import { ReactComponent as SearchSvg } from '@components/Search/search.svg'
import { useContext } from 'react'
import styles from '@components/Search/Search.module.scss'

export default function () {
  const { setIsSending, setPage, setHasMore, owner, setOwner } =
    useContext(AppContext)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setOwner(event.target.value)
  }

  function handleClick() {
    setIsSending(true)
    setPage(1)
    setHasMore(true)
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={owner}
        onChange={handleChange}
        placeholder="Введите название организации"
        className={styles.search__input}
      />
      <button onClick={handleClick} className={styles.search__button}>
        <SearchSvg />
      </button>
    </div>
  )
}
