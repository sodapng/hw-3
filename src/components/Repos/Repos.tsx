import Repo from '@components/Repo/Repo'
import styles from '@components/Repos/Repos.module.scss'

export default function ({ data }: { data: Repositories[] }) {
  return (
    <div className={styles.card__container}>
      {data.map(({ id, name, owner, stargazers_count, updated_at }) => {
        return (
          <Repo
            key={id}
            id={id}
            name={name}
            owner={owner}
            stargazers_count={stargazers_count}
            updated_at={updated_at}
          />
        )
      })}
    </div>
  )
}
