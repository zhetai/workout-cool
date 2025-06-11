// This template requires the Embla Auto Scroll plugin to be installed:
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

export const CustomerCarousel = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "/images/brands/9.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "/images/brands/4.png",
      className: "h-20 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "/images/brands/14.png",
      className: "h-32 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "/images/brands/19.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "/images/brands/24.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "/images/brands/29.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "/images/brands/33.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/images/brands/37.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-9",
      description: "Logo 9",
      image: "/images/brands/41.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-10",
      description: "Logo 10",
      image: "/images/brands/46.png",
      className: "h-32 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-32 pt-0 md:pt-16">
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl">{heading}</h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center overflow-hidden lg:max-w-5xl">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem className="basis-1/11 flex justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6" key={logo.id}>
                  <div className="mx-6 flex shrink-0 items-center justify-center md:mx-10">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={logo.description} className={logo.className} src={logo.image} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="from-background absolute inset-y-0 left-0 w-12 bg-gradient-to-r to-transparent"></div>
          <div className="from-background absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
