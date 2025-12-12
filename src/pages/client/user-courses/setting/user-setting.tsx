// src/pages/UserProfileSettings.tsx
import React, { useState } from "react";
import UserSecuritySettings from "./user-security";
import UserForm from "./user-form";
import UserProfileTabs from "./user-tabs";

const UserProfileSettings: React.FC = () => {

  return (
    <div className="min-h-screen bg-white py-6  px-6
    ">
      <div className="container mx-auto">
        <UserProfileTabs/>
     

      
    
      </div>
    </div>
  );
};

export default UserProfileSettings;
