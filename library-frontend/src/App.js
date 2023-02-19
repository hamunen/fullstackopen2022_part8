import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import Recommend from './components/Recommend'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const padding = {
    padding: 5,
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  const navigation = (
    <div>
      <div>
        <Link style={padding} to='/authors'>
          authors
        </Link>
        <Link style={padding} to='/books'>
          books
        </Link>
        {token && (
          <>
            <Link style={padding} to='/recommend'>
              recommend
            </Link>
            <Link style={padding} to='/add'>
              add book
            </Link>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && (
          <Link style={padding} to='/login'>
            login
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <div>
      {navigation}
      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route
          path='/'
          element={<Authors setError={notify} isLoggedIn={!!token} />}
        />
        <Route
          path='/authors'
          element={<Authors setError={notify} isLoggedIn={!!token} />}
        />
        <Route path='/books' element={<Books />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/add' element={<NewBook setError={notify} />} />
        <Route
          path='/login'
          element={<LoginForm setError={notify} setToken={setToken} />}
        />
      </Routes>
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
