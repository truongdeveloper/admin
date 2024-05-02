import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { uniqueId } from "lodash";

export default function SliderImage({
  imageList,
}: {
  imageList: { id: number; maBDS: number; url: string }[];
}) {
  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
  };
  return (
    <Slider {...settings} infinite={imageList.length >= 2}>
      {imageList.length > 1 &&
        imageList.map((item) => (
          <div key={uniqueId()} className="w-full">
            <div className="flex item-center justify-center">
              <Image
                width={500}
                height={500}
                src={item.url}
                alt="Anh BDS"
                className="rounded-lg"
                style={{ height: "400px", objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      {imageList.length === 1 ? (
        <div className="w-full">
          <div className="flex item-center justify-center">
            <Image
              width={500}
              height={500}
              src={imageList[0].url}
              alt="Anh BDS"
              className="rounded-lg"
              style={{ height: "300px", objectFit: "contain" }}
            />
          </div>
        </div>
      ) : null}
    </Slider>
  );
}
