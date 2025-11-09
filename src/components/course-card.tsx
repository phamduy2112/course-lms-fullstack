import { Star } from "lucide-react";

interface CourseCardProps {
  image: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  tag?: string;
}

export default function CourseCard({
  image,
  title,
  author,
  rating,
  reviews,
  price,
  oldPrice,
  tag,
}: CourseCardProps) {
  return (
    <div className="w-[250px] bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      {/* ẢNH */}
      <div className="w-full h-[140px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* NỘI DUNG */}
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 hover:text-indigo-600">
          {title}
        </h3>

        <p className="text-sm text-gray-500">{author}</p>

        {/* ĐÁNH GIÁ */}
        <div className="flex items-center text-sm gap-1">
          <span className="font-semibold text-yellow-600">{rating.toFixed(1)}</span>
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "fill-yellow-500" : "fill-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-gray-500 ml-1">({reviews})</span>
        </div>

        {/* GIÁ */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-gray-900">{price.toLocaleString()} đ</span>
          {oldPrice && (
            <span className="line-through text-gray-400 text-[13px]">
              {oldPrice.toLocaleString()} đ
            </span>
          )}
        </div>

        {/* TAG */}
        {tag && (
          <div className="mt-2 inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-2 py-1 rounded">
            {tag}
          </div>
        )}
      </div>
    </div>
  );
}
