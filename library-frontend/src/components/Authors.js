import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = ({ setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading authors...</div>
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm authorNames={authors.map((a) => a.name)} setError />
    </div>
  )
}

const BirthYearForm = ({ authorNames, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const isValid = name !== '' && born !== ''

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors)
        .map((e) => e.message)
        .join('\n')
      setError(messages)
    },
  })

  const options = authorNames.map((a) => ({ value: a, label: a }))

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name, setBornTo: parseInt(born) },
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form style={{ width: '300px' }} onSubmit={submit}>
        <Select
          placeholder={'Select author'}
          options={options}
          onChange={(e) => setName(e.value)}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit' disabled={!isValid}>
          update author
        </button>
      </form>
    </div>
  )
}

export default Authors
