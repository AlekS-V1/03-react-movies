import css from '../MovieModal/MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface MovieModalProps {
    onClose: () => void;
    movie: Movie;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    const { id, backdrop_path, title, overview, release_date, vote_average } = movie;
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  if (event.target === event.currentTarget) {
    onClose();
  }
};

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow= "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onClose]);

    return createPortal (
        <>          
                <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" key={id}>
                    <div className={css.modal}>
                        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>&times;</button>
                        <img
                            src={backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                                : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'}
                            alt={title}
                            className={css.image}
                        />
                        <div className={css.content}>
                            <h2>{title}</h2>
                            <p>{overview}</p>
                            <p><strong>Release Date:</strong> {release_date}</p>
                            <p><strong>Rating:</strong> {vote_average}/10</p>
                        </div>
                    </div>
                </div>
        </>,
       document.getElementById('modal-root') as HTMLDivElement
    );
}