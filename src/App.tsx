import { Fragment, useEffect, useState } from 'react'
import { ReactComponent as SearchSvg } from '@/search.svg'
import { ReactComponent as StarSvg } from '@/star.svg'
import axios from 'axios'
import styles from '@/App.module.scss'

export default function () {
  const [value, setValue] = useState('')
  const [repos, setRepos] = useState('')
  const [data, setData] = useState<Repositories[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true)

        if (repos) {
          const { data } = await axios.get<Repositories[]>(
            `https://api.github.com/orgs/${repos}/repos`,
            { headers: { Accept: 'application/vnd.github+json' } }
          )

          setData(data)
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('404')) {
            setError('Not Found')
          }
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [repos])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleClick() {
    setRepos(value)
  }

  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.loading}></div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
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
      <div className={styles.card__container}>
        {data.map(({ id, name, url, owner, stargazers_count, updated_at }) => {
          return (
            <Fragment key={id}>
              <article className={styles.card}>
                <figure className={styles.card__figure}>
                  <img
                    src={owner.avatar_url}
                    alt="avatar"
                    className={styles.card__image}
                  />
                </figure>
                <header className={styles.card__header}>
                  <h2 className={styles.card__name}>{name}</h2>
                  <a href="#" className={styles.card__link}>
                    {owner.login}
                  </a>
                  <div className={styles.card__footer}>
                    <span className={styles.card__stars}>
                      <StarSvg />
                      {stargazers_count}
                    </span>
                    <span className={styles.card__updated}>Updated 21 Jul</span>
                  </div>
                </header>
              </article>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
