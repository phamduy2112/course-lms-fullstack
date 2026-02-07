import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import UserForm from "./user-form";
import UserSecuritySettings from "./user-security";


export default function UserProfileTabs() {
  const tabs = [
    { key: "profile", label: "Hồ sơ Udemy", content: <UserForm /> },
    // { key: "avatar", label: "Ảnh hồ sơ", content: <Avatar /> },
    { key: "security", label: "Cài đặt bảo mật", content: <UserSecuritySettings /> },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      {/* Tab buttons */}
      <div className="border-b mb-6 flex gap-8 text-gray-700 font-medium">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 ${
              activeTab === tab.key
                ? "border-b-2 bg-none border-indigo-600 text-indigo-600"
                : "hover:text-indigo-600"
            } transition-colors duration-200`}
          >
            {tab.label}
          </button>
        ))}
        
      </div>

   
    </div>
  );
}
