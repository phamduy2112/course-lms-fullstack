import React, { useState } from "react";

const UserForm = () => {
     const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
          {/* Form */}
        <div className="space-y-6">
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
            <div>
              <label className="block font-medium mb-1">Họ</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
              disabled
            >
              Lưu
            </button>
          </div>
        </div>
    </div>
  )
}

export default UserForm