"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import CourseCard from "./course-card";

interface CourseSliderProps {
  courses: {
    image: string;
    title: string;
    author: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    tag?: string;
  }[];
}

export default function CourseSlider({ courses }: CourseSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Cập nhật trạng thái nút mỗi khi trượt
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Nút trái */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Nút phải */}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {courses.map((course, i) => (
            <div
              key={i}
              className="flex-[3rem] "
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
