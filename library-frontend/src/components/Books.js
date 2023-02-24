import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenres] = useState()

  if (result.loading) {
    return <div>loading books...</div>
  }

  const allBooks = result.data.allBooks
  const filteredBooks = selectedGenre
    ? allBooks.filter((b) => {
        return b.genres.some((genre) => genre === selectedGenre)
      })
    : allBooks

  const genresSet = allBooks.reduce((acc, book) => {
    book.genres.forEach((genre) => acc.add(genre))
    return acc
  }, new Set())
  const genreOptions = [...genresSet].map((g) => ({ value: g, label: g }))
  genreOptions.push({ value: undefined, label: 'All genres' })

  const handleChange = (selected) => {
    setSelectedGenres(selected.value)
  }

  return (
    <div>
      <h2>books</h2>
      <div style={{ width: '600px' }}>
        <Select
          placeholder={'Filter by genre'}
          options={genreOptions}
          onChange={handleChange}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
