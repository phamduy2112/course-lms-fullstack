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

      {/* Tab content with fade */}
      <div className="relative min-h-[100px]">
        {tabs.map((tab) => (
          <Transition
            as={Fragment}
            key={tab.key}
            show={activeTab === tab.key}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0">{tab.content}</div>
          </Transition>
        ))}
      </div>
    </div>
  );
}
