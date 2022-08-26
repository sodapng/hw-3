import { AppContext } from '@/AppContext'
import { Fragment, useContext } from 'react'
import styles from '@components/Radio/Radio.module.scss'

const types = [
  { value: 'all', checked: true },
  { value: 'public', checked: false },
  { value: 'forks', checked: false },
  { value: 'sources', checked: false },
  { value: 'member', checked: false },
  { value: 'internal', checked: false },
]

export default function () {
  const { setType, type } = useContext(AppContext)

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }

  return (
    <div className={styles.radio}>
      {types.map(({ value, checked }) => {
        return (
          <Fragment key={value}>
            <label className={styles.radio__label}>
              <input
                className={styles.radio__input}
                type="radio"
                name="type"
                value={value}
                checked={value === type}
                onChange={handleClick}
              />
              <span className={styles.radio__btn}>{value}</span>
            </label>
          </Fragment>
        )
      })}
    </div>
  )
}
