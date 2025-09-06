import css from '../MovieGrid/MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
    items: Movie[];
    onSelect: (movie: Movie) => void;
}
export default function MovieGrid({ items = [], onSelect}: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {items.map((item) => (
                <li key={item.id} onClick={() => {
                    onSelect(item);
                }}>
                    <div className={css.card}>
                        <img className={css.image} src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}`:'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'} alt={item.title} loading="lazy" />
                        <h2 className={css.title}>{item.title}</h2>
                    </div>
                </li>))}
        </ul>

    )
}