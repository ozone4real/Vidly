import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import Categories from "./listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  handlePageClick = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
  }

  handleGenreSelect = category => {
    this.setState({ selectedGenre: category, currentPage: 1 });
  };

  handleDelete = id => {
    let movies = [...this.state.movies];
    movies = movies.filter(m => m._id !== id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: totalMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? totalMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : totalMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(currentPage, pageSize, sorted);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      movies: totalMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    const { length: count } = totalMovies;
    if (count === 0) return <p>There are movies in the database</p>;

    return (
      <div className="row">
        <div className="col-md-auto">
          <Categories
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col-md">
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            itemsCount={totalCount}
            onPageClick={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
