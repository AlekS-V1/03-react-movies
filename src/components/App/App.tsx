import { useState } from 'react'
import SearchBar from "../SearchBar/SearchBar"
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';


function App() {
 
  // const [count, setCount] = useState(0)

// 1. Оголошуємо і типізуємо стан
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoader, setLoader] = useState(false)

  // useEffect(() => {setLoader(true)}, [])


  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const notifyQuery = () => toast.error('No movies found for your request.');
  const handleSearch = async (topic: string) => {
    setErrorMessage(false)
    
    try {
      setLoader(true)
      const data = await fetchMovies(topic);

      setMovies(data);
      if (data.length === 0) {
        setLoader(false);
        notifyQuery();        
        return;
      }
     setLoader(false)
    } catch {
      setLoader(true);
      setErrorMessage(true);
      setLoader(false);
    }
    finally {
      setLoader(false)
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoader && <Loader />}
        <Toaster />
      {movies.length > 0 && <MovieGrid items={movies}
        onSelect={handleMovieClick}
      />}
      {errorMessage && <ErrorMessage />}
      {isModalOpen && selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setIsModalOpen(false)} />)}

     
    </>
  )
}

export default App




  // return (
  //   <div>
  //     <h1>Main content of the page</h1>
  //     <button onClick={openModal}>Open modal</button>
  //     {isModalOpen && <Modal onClose={closeModal} />}
  //   </div>
  // );
