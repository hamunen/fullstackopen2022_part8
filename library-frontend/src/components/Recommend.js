import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommend = () => {
  const genreResult = useQuery(CURRENT_USER)
  const booksResult = useQuery(ALL_BOOKS)

  if (genreResult.loading || booksResult.loading) {
    console.log('loading...')
    return <div>loading...</div>
  }

  console.log(genreResult.data)

  const genre = genreResult.data.me.favouriteGenre
  const allBooks = booksResult.data.allBooks

  const filteredBooks = genre
    ? allBooks.filter((b) => b.genres.includes(genre))
    : allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <b>{genre}</b>
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

export default Recommend
