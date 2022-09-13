import { RepoItemModel } from '@/models/repoItem'
import Repo from '@/components/Repo/Repo'
import styles from '@/components/Repos/Repos.module.scss'

export default function ({ data }: { data: RepoItemModel[] }) {
  return (
    <div className={styles.card__container}>
      {data.map(({ id, name, owner, stargazersCount, updatedAt }) => {
        return (
          <Repo
            key={id}
            id={id}
            name={name}
            owner={owner}
            stargazersCount={stargazersCount}
            updatedAt={updatedAt}
          />
        )
      })}
    </div>
  )
}
