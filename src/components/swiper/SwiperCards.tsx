import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "./swiperCard/SwiperCard";
// import required modules
import { FreeMode, Navigation, Autoplay } from "swiper";
import { card} from "@/data/interfaces";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./swipercards.module.scss";

const SwiperCards = ({ data }: { data: any }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
     
      navigation={true}
      modules={[FreeMode, Navigation, Autoplay]}
      className="mySwiper"
      loop={true}
      speed={500}
    >
      {data?.map((item: any, index: number) => (
        <SwiperSlide className={styles.swiper_slide} key={index}>
          <SwiperCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCards;
