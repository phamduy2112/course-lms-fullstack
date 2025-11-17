import AdminLayout from "@/layout/admin/admin-layout";
import ClientLayout from "@/layout/client/ClientLayout";
import AdminCourses from "@/pages/admin/course/admin-courses";
import CreateCoursePage from "@/pages/admin/course/create/create-course";
import Edit from "@/pages/admin/course/edit/edit";
import { Login } from "@/pages/client/auth/login";
import { VerifyOtp } from "@/pages/client/auth/verify-otp";
import CartPage from "@/pages/client/cart/cart";
import CourseDetail from "@/pages/client/course-detail/course-detail";
import Courses from "@/pages/client/courses/courses";
import Home from "@/pages/client/Home";
import LearningPage from "@/pages/client/user-courses/learning/Learning";
import UserProfileSettings from "@/pages/client/user-courses/setting/user-setting";
import UserDetail from "@/pages/client/user-courses/user-detail";
import VideoDetail from "@/pages/client/video-detail/video-detail";
import { createBrowserRouter } from "react-router-dom";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<ClientLayout/>,
        children:[
            { index: true, element: <Home /> },
            {path:"/courses",element:<Courses/>},
           
            {path:"/course-detail",element:<CourseDetail/>},
            {path:"/cart",element:<CartPage/>},
            {path:"/user/detail",element:<UserDetail/>},
            {path:"/user/detail/setting",element:<UserProfileSettings/>},
            {path:"/my-courses/learning",element:<LearningPage/>}
        ],
        
    },
     {path:"/login",element:<Login/>},
     {path:"/verity-otp",element:<VerifyOtp/>},
    {
        path:"/video/detail",
        element:<VideoDetail/>
    },
    {
        path:"admin",
        element:<AdminLayout/>,
        children:[
            {path:"courses",element:<AdminCourses/>},
            {path:"courses/create",element:<CreateCoursePage/>},
            {path:"courses/edit",element:<Edit></Edit>}
        ]
    }
])