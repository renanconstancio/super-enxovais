import { useRef, useState } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import './style.scss';

type TImageRenderer = {
  height: number;
  width: number;
  url: string;
  thumb: string;
};

const ImageRenderer = ({ url, thumb, width, height }: TImageRenderer) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        width: '100%',
        paddingBottom: `${(height / width) * 100}%`
      }}>
      {isInView && (
        <>
          <img className={`image thumb ${!!isLoaded && 'isLoaded'}`} src={thumb} alt={url} />
          <img
            className={`image ${!!isLoaded && 'isLoaded'}`}
            src={url}
            onLoad={handleOnLoad}
            alt={url}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
