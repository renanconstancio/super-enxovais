// import ImageRenderer from '../ImageRenderer';

import ImageRenderer from '../ImageRenderer';

const Banners = ({ resource }: any) => {
  const banners = resource.banners.read();

  return (
    <section className="bg-white pt-4 pt-md-0">
      <div className="container-md pb-3">
        <div className="row">
          <div
            id="carouselBannersInterval"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              {!!banners &&
                banners.map((rws: { banner: string; link: string }, i: any) => (
                  <div className={`carousel-item ${i === 0 && 'active'}`} key={i}>
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
              data-bs-target="#carouselBannersInterval"
              data-bs-slide="prev">
              <i className="fas fa-chevron-left fa-3x text-white" aria-hidden="true"></i>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselBannersInterval"
              data-bs-slide="next">
              <i className="fas fa-chevron-right fa-3x text-white" aria-hidden="true"></i>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banners;
