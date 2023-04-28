import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCard from "./swiperCard/SwiperCard";
// import required modules
import { FreeMode, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide style={{ width: "388px" }}>
        <SwiperCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperCards;
