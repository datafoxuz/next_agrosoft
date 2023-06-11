import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "./swiperCard/SwiperCard";
// import required modules
import { FreeMode, Navigation, Autoplay } from "swiper";
import { card, data } from "@/data/interfaces";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./swipercards.module.scss";

const SwiperCards = ({ data }: { data: data }) => {
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
      {data?.data?.map((item: card, index: number) => (
        <SwiperSlide className={styles.swiper_slide} key={index}>
          <SwiperCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCards;
