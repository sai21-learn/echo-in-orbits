'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface AppState {
    selectedStarId: string | null
    selectStar: (id: string | null) => void
    coordinates: { az: number, el: number }
    setCoordinates: (az: number, el: number) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [selectedStarId, setSelectedStarId] = useState<string | null>(null)
    const [coordinates, setCoordinatesState] = useState({ az: 0, el: 0 })

    const setCoordinates = (az: number, el: number) => {
        setCoordinatesState({ az, el })
    }

    return (
        <AppContext.Provider value={{
            selectedStarId,
            selectStar: setSelectedStarId,
            coordinates,
            setCoordinates
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppStore() {
    const context = useContext(AppContext)
    if (!context) throw new Error('useAppStore must be used within AppProvider')
    return context
}
