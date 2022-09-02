import { Fragment } from 'react'
import { appStore } from '@/store/AppStore'
import { observer } from 'mobx-react-lite'
import TypeRepo from '@/models/typeRepo'
import styles from '@/components/Radio/Radio.module.scss'

const types = [
  { value: TypeRepo.ALL, checked: true },
  { value: TypeRepo.PUBLIC, checked: false },
  { value: TypeRepo.FORKS, checked: false },
  { value: TypeRepo.SOURCES, checked: false },
  { value: TypeRepo.MEMBER, checked: false },
  { value: TypeRepo.INTERNAL, checked: false },
]

export default observer(function () {
  const { type, setType } = appStore

  return (
    <div className={styles.radio}>
      {types.map(({ value }) => {
        return (
          <Fragment key={value}>
            <label className={styles.radio__label}>
              <input
                className={styles.radio__input}
                type="radio"
                name="type"
                value={value}
                checked={value === type}
                onChange={(e) => setType(e.target.value as TypeRepo)}
              />
              <span className={styles.radio__btn}>{value}</span>
            </label>
          </Fragment>
        )
      })}
    </div>
  )
})
