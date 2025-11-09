import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: string;
  price: number;
  image: string;
}

export function CourseCardList(props: CourseCardProps) {
  return (
    <div className="flex border-b-2 py-[1rem]">
         <img
        src={props.image}
        alt={props.title}
        className="w-[25rem] h-full object-cover"
      />
      <CardContent className="flex flex-col justify-between x-4 w-full">
        <div>
          <h3 className="font-semibold text-lg">{props.title}</h3>
          <p className="text-[.9rem] text-gray-600">{props.description}</p>
          <span className="text-[.8rem] text-gray-600">Duyzxmot</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{props.rating}</span>
            <span className="text-yellow-500">★</span>
            <span className="text-gray-500">({props.reviews})</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tổng số {props.duration} • {props.lectures} bài giảng • {props.level}
          </p>
        </div>
        
      </CardContent>
      <p className="text-right font-bold text-lg text-violet-700">
          {props.price.toLocaleString()}đ
        </p>
     </div>
  );
}
