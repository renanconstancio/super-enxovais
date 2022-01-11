export const apiBanners = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          banner: '/banners/banner-01.jpg',
          link: ''
        },
        {
          banner: '/banners/banner-02.jpg',
          link: ''
        }
      ]);
    }, 2150);
  });
};
