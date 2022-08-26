import clsx from 'clsx'
import styles from '@components/Loading/Loading.module.scss'

type LoadingProps = {
  isScroll?: boolean
}

export default function ({ isScroll = false }: LoadingProps) {
  const container = clsx(!isScroll ? styles.center : styles.footer)

  return (
    <div className={container}>
      <div className={styles.loading}></div>
    </div>
  )
}
