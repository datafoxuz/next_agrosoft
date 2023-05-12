import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "./swiperCard/SwiperCard";
// import required modules
import { FreeMode, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./swipercards.module.scss";

const SwiperCards = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation={true}
      modules={[FreeMode, Navigation, Autoplay]}
      className="mySwiper"
      loop={true}
      speed={500}
    >
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <SwiperCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperCards;
