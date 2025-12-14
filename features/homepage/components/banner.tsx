/* eslint-disable @next/next/no-img-element */
'use client';

import { BannerConfig } from '@/api/server/method/ui/homepage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  banner: BannerConfig;
};

export default function Banner({ banner }: Props) {
  if (!banner.pictures || banner.pictures.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="overflow-hidden rounded-xl"
      >
        {banner.pictures.map((pic, index) => (
          <SwiperSlide key={index}>
            <Link
              href={pic.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="relative w-full">
                <img
                  src={pic.src}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
