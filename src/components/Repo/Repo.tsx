import { Link } from 'react-router-dom'
import { ReactComponent as StarSvg } from '@components/Repo/star.svg'
import styles from '@components/Repo/Repo.module.scss'

export default function ({
  name,
  owner,
  stargazers_count,
  updated_at,
}: Repositories) {
  const date = new Date(updated_at).toDateString()
  const day = date.substring(8, 10)
  const month = date.substring(4, 7)

  return (
    <Link to={`repos/${owner.login}/${name}`} className={styles.card}>
      <figure className={styles.card__figure}>
        <img
          src={owner.avatar_url}
          alt="avatar"
          className={styles.card__image}
        />
      </figure>
      <header className={styles.card__header}>
        <h2 className={styles.card__name}>{name}</h2>
        <span className={styles.card__link}>{owner.login}</span>
        <div className={styles.card__footer}>
          <span className={styles.card__stars}>
            <StarSvg />
            {stargazers_count}
          </span>
          <span className={styles.card__updated}>
            Updated {day} {month}
          </span>
        </div>
      </header>
    </Link>
  )
}
