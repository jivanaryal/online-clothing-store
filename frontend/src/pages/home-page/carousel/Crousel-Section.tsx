import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CarouselType } from "../../../types/Carousel";
import CarouselData from "./Carousel.json";

import { Card, CardContent } from "@/components/ui/card";

type Props = {};

const CarouselSection: React.FC<Props> = () => {
  return (
    <div className="container flex justify-center items-center md:py-3">
      <Carousel
        className="w-full md:w-11/12 h-2/3"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {(CarouselData as CarouselType[]).map((carousel, i) => {
            return (
              <CarouselItem key={i} className="h-16 sm:h-20 md:h-[40vh]">
                <div>
                  <Card className="w-full md:mx-auto h-16 sm:h-[20vh] md:h-[40vh] flex items-center  border-0">
                    <CardContent className="flex items-center justify-center p-0 ">
                      <img
                        src={carousel.imageURL}
                        className="h-full w-full object-contain rounded-2xl"
                        alt={`slider image ${i + 1}`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselSection;
