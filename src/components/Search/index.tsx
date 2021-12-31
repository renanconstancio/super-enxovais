const Search = () => {
  return (
    <div className="input-group input-group-lg">
      <input type="text" className="form-control" placeholder="Buscar produtos..." />
      <button className="btn btn-primary" type="button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
