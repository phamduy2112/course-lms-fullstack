import { Globe } from "lucide-react";

export default function Footer() {
  const sections = [
    {
      title: "Giới thiệu",
      links: [
        "Giới thiệu về chúng tôi",
        "Việc làm",
        "Liên hệ với chúng tôi",
        "Blog",
        "Nhà đầu tư",
      ],
    },
    {
      title: "Khám phá Udemy",
      links: [
        "Tải ứng dụng",
        "Giảng dạy trên Udemy",
        "Gói và Giá cả",
        "Đơn vị liên kết",
        "Trợ giúp và Hỗ trợ",
      ],
    },
    {
      title: "Udemy for Business",
      links: ["Udemy Business"],
    },
    {
      title: "Pháp lý & Khả năng tiếp cận",
      links: [
        "Tuyên bố về khả năng tiếp cận",
        "Chính sách về quyền riêng tư",
        "Sơ đồ trang web",
        "Điều khoản",
      ],
    },
  ];

  return (
    <footer className="bg-[#1C1D1F] text-gray-300 py-10 px-6 md:px-16 text-sm">
      {/* GRID 4 CỘT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto">
        {sections.map((section, i) => (
          <div key={i}>
            <h3 className="font-semibold mb-3 text-white">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, j) => (
                <li
                  key={j}
                  className="hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ĐƯỜNG KẺ NGANG */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* PHẦN DƯỚI */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <img src="/udemy-logo.svg" alt="Udemy" className="h-5" />
          <span className="text-gray-400">© 2025 Udemy, Inc.</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <Globe className="w-4 h-4" />
          <span>Tiếng Việt</span>
        </div>
      </div>
    </footer>
  );
}
