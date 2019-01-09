const Paginate = (currentPage, pageSize, movies) => {
  const index = (currentPage - 1) * pageSize;
  return movies.slice(index, index + pageSize);
};

export default Paginate;
