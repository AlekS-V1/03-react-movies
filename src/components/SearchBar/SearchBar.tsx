
import styles from '../SearchBar/SearchBar.module.css';

import toast, { Toaster } from 'react-hot-toast';

const notifySearch = () => toast.error('Please enter your search query.');

interface searchFormProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({onSubmit}: searchFormProps) {

    const handleSubmit = (formData: FormData) => {
	  const query = formData.get("query") as string;
     if (query === "") {
      notifySearch();
      return;
    }       
    onSubmit(query);
  };
    
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Toaster />
                <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" >Powered by TMDB</a>
                <form className={styles.form}  action={handleSubmit}>
                    <input className={styles.input} type="text" name="query" autoComplete="off" placeholder="Search movies..." autoFocus />
                    <button className={styles.button} type="submit">Search</button>
                    
                </form>
            </div>
        </header>

    )
}