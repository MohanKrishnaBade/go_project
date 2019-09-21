/*!

=========================================================
* Material Home React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views for Admin layout
import DashboardPage from "views/Home/HomeTab.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import GoLang from "views/GoLang/GoLangTab.jsx";
import Typography from "views/PHP/PhpTab.jsx";
import ReactJs from "views/ReactJs/ReactJs"
import CreateArticle from "views/Article/CreateArticle.jsx"
import CalenderTab from "./views/Calender/CalenderTab";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "HOME",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    articleType:"home",
    layout: "/admin"
  },
  {
    path: "/go",
    name: "Go Lang",
    rtlName: "قائمة الجدول",
    icon: BubbleChart,
    component: GoLang,
    articleType:"go",
    layout: "/admin"
  },
  {
    path: "/php",
    name: "Php Lang",
    rtlName: "طباعة",
    icon: BubbleChart,
    component: Typography,
    articleType:"php",
    layout: "/admin"
  },
  {
    path: "/react",
    name: "React Js",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BubbleChart,
    component: ReactJs,
    articleType:"react",
    layout: "/admin"
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   articleType:"user",
  //   layout: "/admin"
  // },
  // {
  //   path: "/PhpLang/article",
  //   name: "php article create PAge",
  //   rtlName: "ادول",a
  //   icon: BubbleChart,
  //   component: CreateArticle,
  //   articleType:"php",
  //   layout: "/admin"
  // },
  // {
  //   path: "/create/:type",
  //   name: "go article create PAge",
  //   rtlName: "قائمة اول",
  //   icon: BubbleChart,
  //   component: CreateArticle,
  //   articleType:null,
  //   layout: "/admin"
  // },
//   {
//     path: "/ReactJs/article",
//     name: "react article create PAge",
//     rtlName: "قا الجدول",
//     icon: BubbleChart,
//     component: CreateArticle,
//     articleType:"ReactJs",
//     layout: "/admin"
//   },
];

export default dashboardRoutes;
