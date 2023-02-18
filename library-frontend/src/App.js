import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const padding = {
    padding: 5,
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/authors'>
          authors
        </Link>
        <Link style={padding} to='/books'>
          books
        </Link>
        <Link style={padding} to='/add'>
          add book
        </Link>
      </div>
      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/authors' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
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
