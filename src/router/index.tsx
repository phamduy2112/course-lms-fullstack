import AdminLayout from "@/layout/admin/admin-layout";
import ClientLayout from "@/layout/client/ClientLayout";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdminCourses from "@/pages/admin/course/admin-courses";
import CreateCoursePage from "@/pages/admin/course/create/create-course";
import { Login } from "@/pages/client/auth/login";
import { Register } from "@/pages/client/auth/register";
import { VerifyOtp } from "@/pages/client/auth/verify-otp";
import CartPage from "@/pages/client/cart/cart";
import CheckoutPage from "@/pages/client/check-out/check-out";
import OrderConfirmedPage from "@/pages/client/check-out/success/order-confirm";
import CourseDetail from "@/pages/client/course-detail/course-detail";
import Courses from "@/pages/client/courses/courses";
import Home from "@/pages/client/Home";
import LearningPage from "@/pages/client/user-courses/learning/Learning";
import UserProfileSettings from "@/pages/client/user-courses/setting/user-setting";
import UserDetail from "@/pages/client/user-courses/user-detail";
import VideoDetail from "@/pages/client/video-detail/video-detail";
import { CategoryCMS } from "@/pages/cms/category/category-cms";
import CategoryDashboard from "@/pages/cms/category/category-dashboard";
import InstructorApplicantReview from "@/pages/cms/instructor/appli-review";
import InstructorProfilePage from "@/pages/cms/instructor/detail/instructor-detail";
import InstructorManagementPage from "@/pages/cms/instructor/instructor-management";
import RolesPermissionsPage from "@/pages/cms/permission/permission-role";
import UserAccessManagement from "@/pages/cms/permission/user-access-managenment";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:slug", element: <CourseDetail /> },
      { path: "cart", element: <CartPage /> },
      { path: "user/detail", element: <UserDetail /> },
      { path: "user/detail/setting", element: <UserProfileSettings /> },
      { path: "my-courses/learning", element: <LearningPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-confirmed", element: <OrderConfirmedPage /> },
    ],
  },
        { path: "course/:slug/:learning", element: <VideoDetail /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "courses/create", element: <CreateCoursePage /> },
      { path: "category/dashboard", element: <CategoryDashboard /> },
      { path: "category", element: <CategoryCMS /> },
      { path: "instructors", element: <InstructorManagementPage /> },
      { path: "instructors/:name", element: <InstructorProfilePage /> },
      { path: "instructors/apply/:name", element: <InstructorApplicantReview /> },
      { path: "permissions&role", element: <UserAccessManagement /> },
      // { path: "courses/edit", element: <Edit /> },
    ],
  },
]);
