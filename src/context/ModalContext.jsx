import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null) // 'auth' | 'account' | 'demo' | 'info' | null
  const [modalData, setModalData] = useState({})

  const openAuth = (tab = 'signin') => {
    setModalData({ tab })
    setActiveModal('auth')
  }

  const openAccount = (step = 1) => {
    setModalData({ step })
    setActiveModal('account')
  }

  const openDemo = (videoData = {}) => {
    setModalData(videoData)
    setActiveModal('demo')
  }

  const openInfo = (data = {}) => {
    setModalData(data)
    setActiveModal('info')
  }

  const closeModal = () => {
    setActiveModal(null)
    setModalData({})
  }

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        modalData,
        openAuth,
        openAccount,
        openDemo,
        openInfo,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
