"use client";
import styles from "../../styles/Finished.module.scss";
import { useBoughtProductsContext } from "../contexts/BoughtProductsContext";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useWindowSizeContext } from "../contexts/WindowSizeContext";

// Swiper modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import Loading from "../items/Loading";
import { useUserDataContext } from "../contexts/UserDataContext";

export default function Finished() {
  const { boughtProducts, justBoughtProducts } = useBoughtProductsContext();
  const { userData } = useUserDataContext();
  const windowSize = useWindowSizeContext();
  const [qtdImages, setQtdImages] = useState(1);
  useEffect(() => {}, [justBoughtProducts]);
  useEffect(() => {
    if (windowSize.width <= 650) {
      setQtdImages(1);
    } else if (windowSize.width <= 950) {
      setQtdImages(2);
    } else if (windowSize.width <= 1400) {
      setQtdImages(3);
    } else {
      setQtdImages(4);
    }
  }, [windowSize]);
  return (
    <section>
      {justBoughtProducts === undefined ? (
        <Loading />
      ) : justBoughtProducts === null ? (
        <div className={styles.finished}>
          <h2>You didn't but anything now</h2>
          {boughtProducts ? (
            <div className={styles.prodArea}>
              <p>
                But you have already bought some items before. Check them out:
              </p>
              <Swiper
                className={styles.swiper}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Pagination]}
                slidesPerView={qtdImages}
                navigation
              >
                {boughtProducts.map((prod, i) => (
                  <SwiperSlide key={i} property="">
                    <div>
                      <Product
                        id={prod.id}
                        title={prod.title}
                        price={prod.price}
                        discount={prod.discount}
                        discountedPrice={prod.discountedPrice}
                        images={prod.images}
                        description={prod.description}
                        categories={prod.categories}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <p>
              And have never bought anything yet. Come on, what are you waiting
              for?
            </p>
          )}
        </div>
      ) : (
        <div className={styles.finished}>
          <h1>
            Perfect, {userData!.name.split(" ")[0]}! Your purchase is already
            being processed.
          </h1>
          <p>
            We will notify you in about 200 years about the paying method in
            your email address, but you can be sure that your orders will arrive
            at the expected time.
          </p>
          <p>
            Use the waiting time to keep shopping! Continue shopping and be even
            more prepared to the future.
          </p>
          <h3>What you just bought</h3>
          <div className={styles.prodArea}>
            {justBoughtProducts && (
              <Swiper
                className={styles.swiper}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Pagination]}
                slidesPerView={qtdImages}
                navigation
              >
                {justBoughtProducts.map((prod, i) => (
                  <SwiperSlide key={i} property="">
                    <div>
                      <Product
                        id={prod.id}
                        title={prod.title}
                        price={prod.price}
                        discount={prod.discount}
                        discountedPrice={prod.discountedPrice}
                        images={prod.images}
                        description={prod.description}
                        categories={prod.categories}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
