const Search = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Buscar produtos..."
      />
      <button className="btn btn-primary rounded-end" type="button">
        <i className="fas fa-search text-white"></i>
      </button>
      <button
        className="btn d-md-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#searchCollapse"
        aria-expanded="false"
        aria-controls="searchCollapse">
        <i className="fas fa-times text-primary"></i>
      </button>
    </div>
  );
};

export default Search;
