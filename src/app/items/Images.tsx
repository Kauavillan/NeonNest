import Image from "next/image";
import styles from "../../styles/Images.module.scss";
import { useEffect, useRef, useState } from "react";
import { useWindowSizeContext } from "../contexts/WindowSizeContext";

// Swiper modules
import { register } from "swiper/element/bundle";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import "swiper/scss/zoom";
import { removeAllListeners } from "process";
import { setTimeout } from "timers";

register();

interface Props {
  images: string[];
}

export default function Images({ images }: Props) {
  const { width, height } = useWindowSizeContext();

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  function handleActive(i: number) {
    if (active !== i) setActive(i);
  }
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      const x = e.clientX - imageRef.current!.offsetLeft;
      const y = e.clientY - imageRef.current!.offsetTop;
      imageRef.current!.style.transformOrigin = `${x}px ${y}px`;
      imageRef.current!.style.transform = "scale(2)";
    };

    const resetImg = () => {
      imageRef.current!.style.transformOrigin = "center center";
      imageRef.current!.style.transform = "scale(1)";
      imageRef.current!.removeEventListener("mouseleave", resetImg);
      imageRef.current!.removeEventListener("mousemove", mouseMoveHandler);
      setZoom(false);
    };
    if (imageRef.current && zoom) {
      imageRef.current.addEventListener("mousemove", mouseMoveHandler);
      imageRef.current.addEventListener("mouseleave", resetImg);
    } else if (imageRef.current && !zoom) {
      resetImg();
    }
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("mousemove", mouseMoveHandler);
        imageRef.current.removeEventListener("mouseleave", resetImg);
      }
    };
  }, [zoom]);

  return (
    <>
      {width > 1200 ? (
        <div className={styles.images}>
          <div>
            {images.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt={"Product Image"}
                width={200}
                height={150}
                onMouseEnter={() => {
                  handleActive(i);
                }}
              />
            ))}
          </div>
          <div className={styles.mainImage}>
            <Image
              className={zoom ? styles.zoomed : ""}
              src={images[active]}
              alt={"Product Image"}
              width={1000}
              height={1000}
              onClick={() => setZoom(!zoom)}
              ref={imageRef}
            />
          </div>
        </div>
      ) : (
        <div>
          <Swiper
            className={styles.swiper}
            zoom={{
              toggle: true,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Zoom, Navigation, Pagination]}
            slidesPerView={1}
            navigation
          >
            {images.map((image, i) => (
              <SwiperSlide key={i} property="">
                <div className="swiper-zoom-container">
                  <Image
                    src={image}
                    alt={"Product Image"}
                    className={styles.slideItem}
                    width={400}
                    height={400}
                    ref={imageRef}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
