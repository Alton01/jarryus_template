"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AirBnB } from "@prisma/client";

interface AirbnbCarouselProps {
  airbnb: AirBnB;
}

const AirbnbCarousel = ({ airbnb }: AirbnbCarouselProps) => {
  return (
    <div className="flex px-2 items-center justify-center w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className=" flex w-[85%] sm:w-[90%] md:w-[90%] items-start "
      >
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-1   ">
            <div className="p-1  ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 1"
                    src={airbnb?.airBnBImage1}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="pl-1 ">
            <div className="p-1  ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 2"
                    src={airbnb?.airBnBImage2}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-1 ">
            <div className="p-1 ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 3"
                    src={airbnb?.airBnBImage3}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-1">
            <div className="p-1 ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 4"
                    src={airbnb?.airBnBImage4}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-1  ">
            <div className="p-1 ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 5"
                    src={airbnb?.airBnBImage5}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-1   ">
            <div className="p-1  ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 6"
                    src={airbnb?.airBnBImage6}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-1   ">
            <div className="p-1  ">
              <Card>
                <CardContent className=" p-0">
                  <Image
                    alt="airbnb image 7"
                    src={airbnb?.airBnBImage7}
                    height={2000}
                    width={2000}
                    className=" w-full max-h-56 h-56 md:max-h-72 md:h-72 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 object-fill md:object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AirbnbCarousel;
