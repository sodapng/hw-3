import { createContext, useState } from 'react'

interface AppContextInterface {
  repo: string
  setRepo: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext({} as AppContextInterface)

export const AppProvider = ({ children }: ChildrenProp) => {
  const [repo, setRepo] = useState('')
  const [loading, setLoading] = useState(true)

  return (
    <AppContext.Provider value={{ repo, setRepo, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  )
}
