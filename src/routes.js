/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Students from "views/students/students_all";
import StudentProfile from "views/students/student_profile_detail";
import CenterVenueMap from "views/maps/center_venue_locations";

import UploadStudents from "components/Advanced/uploadStudentsFromExcel";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "Students",
    icon: "fa fa-users text-blue",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/center_google_map",
    name: "Center Venue Location",
    icon: "fa fa-map-marker-alt text-blue",
    component: CenterVenueMap,
    layout: "/admin"
  }
  // {
  //   path: "/maps",
  //   name: "Ministry Skills",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;

export var app_routes = [
  {
    path: "/student/:id/profile",
    name: "Students Profile",
    icon: "ni ni-tv-2 text-primary",
    component: StudentProfile,
    layout: "/admin"
  },
  {
    path: "/advanced/upload-students",
    name: "Upload Students",
    icon: "ni ni-cloud-upload-96",
    component: UploadStudents,
    layout: "/admin"
  }
];
