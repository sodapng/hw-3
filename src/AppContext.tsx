import { createContext, useState } from 'react'

interface AppContextInterface {
  isSending: boolean
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>
  perPage: number
  setPerPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  owner: string
  setOwner: React.Dispatch<React.SetStateAction<string>>
  hasMore: boolean
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
  type: string
  setType: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext({} as AppContextInterface)

export const AppProvider = ({ children }: ChildrenProp) => {
  const [isSending, setIsSending] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [owner, setOwner] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [type, setType] = useState('all')

  return (
    <AppContext.Provider
      value={{
        isSending,
        setIsSending,
        perPage,
        setPerPage,
        page,
        setPage,
        owner,
        setOwner,
        hasMore,
        setHasMore,
        type,
        setType,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
