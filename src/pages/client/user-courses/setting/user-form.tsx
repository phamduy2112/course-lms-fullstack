import { useAppDispatch } from "@/store/hooks";
import { getUserDetail, updateUser } from "@/store/thunks/user-thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserForm = () => {
     const [formData, setFormData] = useState({
    firstName: "",
    headline: "",
    bio: "",
    language: "Tiếng Việt",
    website: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    x: "",
    youtube: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
  };
  const handleSubmit=async (e)=>{
  e.preventDefault(); // ngăn reload trang
  const payload={
    name:formData.firstName,
    bio:formData.bio,

  }
     const resultAction = await dispatch(updateUser(payload));
     

  }


  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);
  const user = useSelector((state) => state.user.user);

useEffect(() => {
  if (user) {
    setFormData({
      firstName: user.data.name || "",
      headline: user.headline || "",
      bio: user.bio || "",
      language: user.language || "Tiếng Việt",
      website: user.website || "",
      facebook: user.facebook || "",
      instagram: user.instagram || "",
      linkedin: user.linkedin || "",
      tiktok: user.tiktok || "",
      x: user.x || "",
      youtube: user.youtube || "",
    });
  }
}, [user]);
  return (
    <div>
          {/* Form */}
        <form onSubmit={handleSubmit}   className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Tên</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

          </div>

          <div>
            <label className="block font-medium mb-1">Đầu đề</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              maxLength={60}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Giảng viên tại Udemy"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tiểu sử</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Giới thiệu về bạn..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Tiểu sử nên có ít nhất 50 từ, không chứa link hoặc mã coupon.
            </p>
          </div>

          {/* Social links */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Trang web", name: "website", prefix: "URL" },
              { label: "Facebook", name: "facebook", prefix: "facebook.com/" },
              { label: "Instagram", name: "instagram", prefix: "instagram.com/" },
              { label: "LinkedIn", name: "linkedin", prefix: "linkedin.com/" },
              { label: "TikTok", name: "tiktok", prefix: "tiktok.com/" },
              { label: "X", name: "x", prefix: "x.com/" },
              { label: "YouTube", name: "youtube", prefix: "youtube.com/" },
            ].map((item, i) => (
              <div key={i}>
                <label className="block font-medium mb-1">{item.label}</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-gray-300 text-gray-600 px-3 py-2 rounded-l-md text-sm flex items-center">
                    {item.prefix}
                  </span>
                  <input
                    type="text"
                    name={item.name}
                    value={(formData as any)[item.name]}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Tên người dùng"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Language */}
          <div>
            <label className="block font-medium mb-1">Ngôn ngữ</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>Tiếng Việt</option>
              <option>English</option>
              <option>日本語</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <button
              className="px-6 py-2 bg-indigo-100 text-indigo-400 rounded-md cursor-not-allowed"
              type="submit"
            >
              Lưu
            </button>
          </div>
        </form>
    </div>
  )
}

export default UserForm