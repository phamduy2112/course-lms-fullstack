import React from "react";
import ListCourses from "../course-detail/components/list-course";
import { useCart } from "@/hooks/query/use-cart";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/service/cart/cart.type";
import type { Course } from "@/service/course/courser.type";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      students: 135,
      price: 279000,
      oldPrice: 779000,
      img: "https://img-c.udemycdn.com/course/480x270/3946764_7d76_3.jpg",
      tag: "Thịnh hành & mới",
    },
    {
      id: 1,
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      students: 135,
      price: 279000,
      oldPrice: 779000,
      img: "https://img-c.udemycdn.com/course/480x270/3946764_7d76_3.jpg",
      tag: "Thịnh hành & mới",
    },
  ];

  const suggestions = [
    {
      id: 1,
      title: "Làm Chủ Git và GitHub Từ A đến Z",
      author: "AI Coding",
      rating: 4.9,
      students: 258,
      price: 279000,
      oldPrice: 1039000,
      img: "https://img-c.udemycdn.com/course/480x270/3946764_7d76_3.jpg",
      badge: "Bán chạy nhất",
    },
    {
      id: 2,
      title: "Lập Trình Python Từ Cơ Bản Đến Nâng Cao Trong 30 Ngày",
      author: "AI Coding",
      rating: 4.8,
      students: 888,
      price: 279000,
      oldPrice: 1059000,
      img: "https://img-c.udemycdn.com/course/480x270/3946764_7d76_3.jpg",
      badge: "Bán chạy nhất",
    },
    {
      id: 3,
      title: "Thành Thạo Docker - Kubernetes trong 8 giờ - 2024",
      author: "Hiệp Nguyễn",
      rating: 4.7,
      students: 397,
      price: 419000,
      oldPrice: 2129000,
      img: "https://img-c.udemycdn.com/course/480x270/3946764_7d76_3.jpg",
    },
  ];

    const { carts,deleteCart,clearCart } = useCart();
  const handleRemoveFromCart = (id:string) => {
    deleteCart.mutate(id);
    // console.log(id)
  };




  const cartItem=carts?.cart_items
  console.log(cartItem)
  return (
    <div className="min-h-screen  py-10">
      <div className="container mx-auto space-y-8">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-semibold text-gray-900">Giỏ hàng</h1>
          <Button onClick={()=>{
            clearCart.mutate()
          }}>Delete All</Button>

        {/* Khu vực chính */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Danh sách khóa học trong giỏ */}
          <div className="flex-1 bg-white  rounded-lg ">
            <h2 className="text-lg font-semibold mb-4">
              {cartItem.length} khóa học trong giỏ hàng
            </h2>
            {cartItem.map((item:any) => (
              <div
                key={item.id}
                className="flex items-start border-b border-gray-200 pb-4 mb-4"
              >
                <img
                  src="https://img-c.udemycdn.com/course/240x135/4467252_61d1_3.jpg"
                  alt={item.title}
                  className="w-36 h-20 rounded object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-800">{item?.course.title}</h3>
                  <p className="text-sm text-gray-500">Bởi {item.author}</p>
                  <div className="flex items-center text-sm text-yellow-600 mt-1">
                    <span className="font-semibold">{item.rating}</span>
                    <span className="mx-1 text-gray-500">★</span>
                    <span className="text-gray-500">
                      ({item.students} xếp hạng)
                    </span>
                  </div>
                  <div className="mt-2 space-x-3 text-xs text-purple-700">
                    <button className="hover:underline" onClick={()=>{
                      handleRemoveFromCart(item.course_id)
                    }}>Xóa</button>
                    <button className="hover:underline">Lưu để mua sau</button>
                    <button className="hover:underline">
                      Chuyển vào danh sách mong ước
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-700 font-semibold">
                   {item.price}
                  </p>
                  <p className="text-sm line-through text-gray-400">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Thanh tóm tắt bên phải */}
          {/* <div className="w-full lg:w-80 bg-white shadow-md rounded-lg p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-800">Tổng:</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatVND(279000)}
            </p>
            <p className="text-sm line-through text-gray-400">
              {formatVND(779000)}
            </p>
            <p className="text-green-600 text-sm font-medium mb-4">
              Giảm 64%
            </p>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md shadow-md font-semibold">
              Tiến hành thanh toán →
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Bạn sẽ không bị tính phí ngay bây giờ
            </p>

            <hr className="my-4" />
            <button className="w-full border border-purple-600 text-purple-700 py-2 rounded-md hover:bg-purple-50">
              Áp dụng coupon
            </button>
          </div> */}
          
        </div>

        {/* Phần gợi ý khóa học */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Bạn cũng có thể thích
          </h2>
       <ListCourses/>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
