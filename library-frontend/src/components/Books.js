import { useQuery } from '@apollo/client'
import { ALL_GENRES, BOOKS_BY_GENRE } from '../queries'
import Select from 'react-select'

const Books = () => {
  const genreResult = useQuery(ALL_GENRES)
  const { loading, data, refetch } = useQuery(BOOKS_BY_GENRE)

  if (loading || genreResult.loading) {
    return <div>loading ...</div>
  }

  const genreOptions = genreResult.data.allGenres.map((g) => ({
    value: g,
    label: g,
  }))
  genreOptions.push({ value: undefined, label: 'All genres' })

  const handleChange = (selected) => {
    refetch({ genre: selected.value })
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
          {data.allBooks.map((b) => (
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
