import { useQuery } from '@apollo/client'
import { CURRENT_USER, RECOMMENDATIONS } from '../queries'

const Recommend = () => {
  const genreResult = useQuery(CURRENT_USER)
  const booksResult = useQuery(RECOMMENDATIONS)

  if (genreResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (!genreResult.data.me) {
    return <div>duh, please login to see recommendations</div>
  }

  const genre = genreResult.data.me.favouriteGenre
  const books = booksResult.data.myRecommendations

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
          {books.map((b) => (
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
