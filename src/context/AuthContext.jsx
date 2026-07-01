/* oxlint-disable react(only-export-components) */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AUTH_USERS_KEY = 'movie-app-auth-users'
const AUTH_CURRENT_USER_KEY = 'movie-app-auth-current-user'

const AuthContext = createContext(null)

const readStoredUsers = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedUsers = window.localStorage.getItem(AUTH_USERS_KEY)
    return storedUsers ? JSON.parse(storedUsers) : []
  } catch {
    return []
  }
}

const readStoredCurrentUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedCurrentUser = window.localStorage.getItem(AUTH_CURRENT_USER_KEY)
    return storedCurrentUser ? JSON.parse(storedCurrentUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStoredUsers())
  const [currentUser, setCurrentUser] = useState(() => readStoredCurrentUser())

  useEffect(() => {
    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(currentUser))
    } else {
      window.localStorage.removeItem(AUTH_CURRENT_USER_KEY)
    }
  }, [currentUser])

  const register = useCallback(({ fullName, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = users.find((user) => user.email.toLowerCase() === normalizedEmail)
    if (existingUser) {
      return { ok: false, message: 'Email already exists.' }
    }

    const nextUser = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
    }

    setUsers((previousUsers) => [...previousUsers, nextUser])
    setCurrentUser({ fullName: nextUser.fullName, email: nextUser.email })

    return { ok: true }
  }, [users])

  const login = useCallback(({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
    )

    if (!matchedUser) {
      return { ok: false, message: 'Invalid email or password.' }
    }

    setCurrentUser({ fullName: matchedUser.fullName, email: matchedUser.email })

    return { ok: true }
  }, [users])

  const updateProfile = useCallback((updates) => {
    setCurrentUser((previousCurrentUser) => {
      if (!previousCurrentUser) {
        return previousCurrentUser
      }

      const nextCurrentUser = { ...previousCurrentUser, ...updates }

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.email.toLowerCase() === previousCurrentUser.email.toLowerCase()
            ? { ...user, ...updates }
            : user,
        ),
      )

      return nextCurrentUser
    })
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      register,
      login,
      logout,
      updateProfile,
    }),
    [currentUser, register, login, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}