import { Link } from 'react-router-dom'
import { RepoItemModel } from '@/models/repoItem'
import { ReactComponent as StarSvg } from '@/components/Repo/star.svg'
import styles from '@/components/Repo/Repo.module.scss'

export default function ({
  name,
  owner,
  stargazersCount,
  updatedAt,
}: RepoItemModel) {
  const date = updatedAt.toDateString()
  const day = date.substring(8, 10)
  const month = date.substring(4, 7)

  return (
    <Link to={`repos/${owner.login}/${name}`} className={styles.card}>
      <figure className={styles.card__figure}>
        <img
          src={owner.avatarUrl}
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
            {stargazersCount}
          </span>
          <span className={styles.card__updated}>
            Updated {day} {month}
          </span>
        </div>
      </header>
    </Link>
  )
}
