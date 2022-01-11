import ImageRenderer from '../ImageRenderer';

const Banners = ({ resource }: any) => {
  const banners = resource.banners.read();

  return (
    <section className="bg-white pt-4 pt-md-0">
      <div className="container-md pb-3">
        <div className="row">
          <div
            id="carouselExampleInterval"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              {!!banners &&
                banners.map((rws: { banner: string; link: string }, i: any) => (
                  <div className="carousel-item active w-100" key={i}>
                    <ImageRenderer
                      width={1583}
                      height={526}
                      url={rws.banner}
                      thumb="/banners/loading.jpg"
                    />
                  </div>
                ))}
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
