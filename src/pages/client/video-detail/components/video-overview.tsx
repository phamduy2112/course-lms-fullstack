import React, { useState } from "react";

const CourseOverview = () => {
  const [activeTab, setActiveTab] = useState("tong-quan");

  const tabs = [
    { id: "tong-quan", label: "Tổng quan" },
    { id: "hoi-dap", label: "Hỏi đáp" },
    { id: "ghi-chu", label: "Ghi chú" },
    { id: "thong-bao", label: "Thông báo" },
    { id: "danh-gia", label: "Đánh giá" },
    { id: "cong-cu", label: "Công cụ học tập" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Thanh Menu */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Nội dung theo tab */}
      <div className="flex justify-center py-10">
        <div className="bg-white  rounded-lg p-8 max-w-4xl w-full space-y-6">
          {activeTab === "tong-quan" && (
            <>
              <h1 className="text-2xl font-semibold text-gray-800">
                Master Python by building 100 projects in 100 days. Learn data
                science, automation, build websites, games and apps!
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold">4.7</span>
                  <span className="text-gray-500">(398,969 xếp hạng)</span>
                </div>
                <span className="w-px h-4 bg-gray-300"></span>
                <span>1.682.764 học viên</span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span>56,5 giờ tổng thời lượng</span>
              </div>

              <div className="text-sm text-gray-500 space-y-1">
                <p>🕒 Lần cập nhật gần đây nhất: Tháng 8 năm 2025</p>
                <p>🌐 Ngôn ngữ: Tiếng Anh, phụ đề Tiếng Việt</p>
              </div>

              <div className="bg-gray-50 border rounded-lg p-5 flex items-start shadow-sm">
                <div className="text-2xl mr-3">⏰</div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 mb-1">
                    Lên lịch thời gian học
                  </h2>
                  <p className="text-sm text-gray-600">
                    Học một chút mỗi ngày sẽ giúp bạn tích lũy kiến thức. Nghiên
                    cứu cho thấy rằng những học viên có thói quen học tập đều
                    đặn sẽ đạt được mục tiêu tốt hơn.
                  </p>
                  <div className="mt-3 space-x-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 shadow-md">
                      Bắt đầu
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 text-sm text-gray-600">
                <h3 className="font-semibold mb-2">Theo số liệu</h3>
                <ul className="space-y-1">
                  <li>Trình độ kỹ năng: Tất cả các cấp</li>
                  <li>Bài giảng: 597</li>
                  <li>Tổng thời lượng video: 56,5 giờ</li>
                  <li>Ngôn ngữ: Tiếng Anh</li>
                  <li>Phụ đề: Có</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === "hoi-dap" && (
            <div className="text-gray-700">💬 Đây là phần Hỏi đáp</div>
          )}
          {activeTab === "ghi-chu" && (
            <div className="text-gray-700">📝 Đây là phần Ghi chú</div>
          )}
          {activeTab === "thong-bao" && (
            <div className="text-gray-700">🔔 Đây là phần Thông báo</div>
          )}
          {activeTab === "danh-gia" && (
            <div className="text-gray-700">⭐ Đây là phần Đánh giá</div>
          )}
          {activeTab === "cong-cu" && (
            <div className="text-gray-700">🧰 Đây là phần Công cụ học tập</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
