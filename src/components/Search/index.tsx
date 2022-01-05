const Search = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Buscar produtos..."
      />
      <button className="btn btn-primary" type="button">
        <i className="fas fa-search text-white"></i>
      </button>
    </div>
  );
};

export default Search;
