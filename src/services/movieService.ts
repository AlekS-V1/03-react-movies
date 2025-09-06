// import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import axios from "axios";

interface MoviesHttpResponse {
  results: Movie[];
}

export async function fetchMovies(topic: string): Promise<Movie[]> {
    const tmdb = import.meta.env.VITE_TMDB_TOKEN;
        // Тут будемо виконувати HTTP-запит
        const response = await axios.get<MoviesHttpResponse>(
            `https://api.themoviedb.org/3/search/movie?query=${topic}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdb}`,
            },
        }
    );
        return response.data.results;
       
    }
    
    