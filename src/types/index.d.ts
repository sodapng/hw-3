interface Repositories {
  id: number
  name: string
  stargazers_count: number
  updated_at: string
  owner: {
    login: string
    html_url: string
    avatar_url: string
  }
}

interface ChildrenProp {
  children: React.ReactNode
}
