import { Star } from "lucide-react";
import LevelUI from "./level-ui";

interface CourseCardProps {
  image: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  discount_price?: number;
  level?: string;
}

export default function CourseCard({
  image,
  title,
  author,
  rating,
  reviews,
  price,
  discount_price,
  level,
}: CourseCardProps) {
  return (
    <div className="w-[250px] bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      {/* ẢNH */}
      <div className="w-full h-[140px] overflow-hidden">
        <img
          src="https://img-c.udemycdn.com/course/240x135/4467252_61d1_3.jpg"
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* NỘI DUNG */}
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 hover:text-indigo-600">
          {title}
        </h3>

        <p className="text-sm text-gray-500">Duy</p>

        {/* ĐÁNH GIÁ */}
        <div className="flex items-center text-sm gap-1">
          <span className="font-semibold text-yellow-600">{rating}</span>
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "fill-yellow-500" : "fill-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-gray-500 ml-1">{reviews || 0}</span>
        </div>

        {/* GIÁ */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-gray-900">{price.toLocaleString()} đ</span>
          {discount_price && (
            <span className="line-through text-gray-400 text-[13px]">
              {discount_price.toLocaleString()} đ
            </span>
          )}
        </div>

        {/* TAG */}
        {/* {tag && (
          <div className="mt-2 inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-2 py-1 rounded">
            {tag}
          </div>
        )} */}
         {/* <div className="mt-2 inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-2 py-1 rounded">
            {level}
          </div> */}
          <LevelUI level={level}/>
      </div>
    </div>
  );
}
