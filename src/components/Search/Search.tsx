import { AppContext } from '@/AppContext'
import { ReactComponent as SearchSvg } from '@components/Search/search.svg'
import { useContext, useState } from 'react'
import styles from '@components/Search/Search.module.scss'

export default function () {
  const [value, setValue] = useState('')
  const { setRepo } = useContext(AppContext)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleClick() {
    setRepo(value)
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={value}
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
