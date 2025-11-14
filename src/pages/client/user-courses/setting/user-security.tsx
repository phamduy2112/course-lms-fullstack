// src/pages/UserSecuritySettings.tsx
import React, { useState } from "react";

const UserSecuritySettings: React.FC = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);

  return (
    <div className=" mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Cài đặt bảo mật</h1>

      {/* Đổi mật khẩu */}
      <section className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Đổi mật khẩu
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Bạn nên sử dụng mật khẩu mạnh và không chia sẻ với người khác.
        </p>

        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="text-indigo-600 font-medium hover:underline"
          >
            Thay đổi mật khẩu
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Lưu mật khẩu
              </button>
              <button
                className="px-5 py-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPasswordForm(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 2FA */}
      <section className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Xác thực hai bước (2FA)
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Bật xác thực hai bước để bảo vệ tài khoản của bạn tốt hơn.
        </p>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={enable2FA}
            onChange={() => setEnable2FA(!enable2FA)}
            className="w-5 h-5 text-indigo-600"
          />
          <span>{enable2FA ? "Đã bật" : "Chưa bật"}</span>
        </label>
      </section>

      {/* Phiên đăng nhập */}
      <section className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Phiên đăng nhập
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Quản lý các thiết bị bạn đã đăng nhập.
        </p>

        <div className="space-y-2">
          <div className="flex justify-between items-center border border-gray-200 rounded-md p-3">
            <div>
              <p className="font-medium">Chrome - Windows 10</p>
              <p className="text-sm text-gray-500">Đăng nhập: 10/11/2025</p>
            </div>
            <button className="text-sm text-indigo-600 hover:underline">
              Đăng xuất
            </button>
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-md p-3">
            <div>
              <p className="font-medium">Safari - iPhone</p>
              <p className="text-sm text-gray-500">Đăng nhập: 08/11/2025</p>
            </div>
            <button className="text-sm text-indigo-600 hover:underline">
              Đăng xuất
            </button>
          </div>
        </div>

        <button className="mt-4 text-sm text-red-600 hover:underline">
          Đăng xuất khỏi tất cả thiết bị
        </button>
      </section>

      {/* Xóa tài khoản */}
      <section>
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Xóa tài khoản
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Hành động này không thể hoàn tác. Tất cả dữ liệu học tập của bạn sẽ bị
          xóa vĩnh viễn.
        </p>
        <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Xóa tài khoản
        </button>
      </section>
    </div>
  );
};

export default UserSecuritySettings;
