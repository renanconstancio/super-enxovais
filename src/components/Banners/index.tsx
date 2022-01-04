const Banners = () => {
  return (
    <section className="bg-white pt-3 pt-md-0">
      <div className="container-md pb-3">
        <div className="row">
          <div
            id="carouselExampleInterval"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/banners/banner-01.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/banners/banner-02.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banners;
