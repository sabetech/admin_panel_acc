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
import ConstituencyDetail from "views/dashboard/dashboard-details/constituency-data-details";
import UploadBussingInfo from "components/Advanced/uploadBussingInfo";

import UploadStudents from "components/Advanced/uploadStudentsFromExcel";
import MinistrySkills from "views/students/ministry_skills";

import Constituencies from "components/Constituencies/constituencies";
import AllConstituencyCharts from "views/dashboard/dashboard-details/constituency_all_charts";
import StudentAttn from "views/students/student_attn";

import StudentCenterLeaders  from "views/students/student_center_leaders";
import StudentSontaLeaders  from "views/students/student_sonta_leaders";
import StudentBacentaLeaders from "views/students/student_bacenta_leaders";
import StudentChurchPlanters from "views/students/students_church_planters";
import GeneralStudentBussing from "views/students/general_bussing_report";


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
    icon: "fa fa-users text-success",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/center_google_map",
    name: "Center Venue Location",
    icon: "fa fa-map-marker-alt text-danger",
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
    path: "/students/center_leaders",
    name: "Center Leaders",
    icon: "ni ni-tv-2 text-primary",
    component: StudentCenterLeaders,
    layout: "/admin"
  },
  {
    path: "/students/sonta_leaders",
    name: "Sonta Leaders",
    icon: "ni ni-tv-2 text-primary",
    component: StudentSontaLeaders,
    layout: "/admin"
  },
  {
    path: "/students/bacenta_leaders",
    name: "Bacenta Leaders",
    icon: "ni ni-tv-2 text-primary",
    component: StudentBacentaLeaders,
    layout: "/admin"
  },
  {
    path: "/students/church_planters",
    name: "Church Planters",
    icon: "ni ni-tv-2 text-primary",
    component: StudentChurchPlanters,
    layout: "/admin"
  },
  {
    path: "/student/:id/profile",
    name: "Students Profile",
    icon: "ni ni-tv-2 text-primary",
    component: StudentProfile,
    layout: "/admin"
  },
  {
    path: "/constituency/:id",
    name: "Constituency",
    icon: "ni ni-tv-2 text-primary",
    component: ConstituencyDetail,
    layout: '/admin'
  },
  {
    path: "/advanced/upload-students",
    name: "Upload Students",
    icon: "ni ni-cloud-upload-96",
    component: UploadStudents,
    layout: "/admin"
  },
  {
    path: "/advanced/upload-bussing-report",
    name: "Upload Bussing Report",
    icon: "ni ni-cloud-upload-96",
    component: UploadBussingInfo,
    layout: "/admin"
  },
  {
    path: "/students/ministry-skills",
    name: "Ministry Skills",
    icon: "ni ni-tv-2 text-primary",
    component: MinistrySkills,
    layout: "/admin"
  },
  {
    path: "/con_reps",
    name: "Constituencies",
    icon: "ni ni-tv-2 text-primary",
    component: Constituencies,
    layout: "/admin"
  },{
    path: "/all_constituency_monthly_charts",
    name: "Constituency Monthly Bussing Chart",
    icon: "ni ni-tv-2 text-primary",
    component: AllConstituencyCharts,
    layout: "/admin"
  },
  {
    path: "/students/anagkazo_live_attn",
    name: "Attendance",
    icon: "ni ni-tv-2 text-primary",
    component: StudentAttn,
    layout: "/admin"
  },
  {
    path: "/students/generate-bussing-report",
    name: "General Bussing report",
    icon: "ni ni-bus-front-12 text-primary",
    component: GeneralStudentBussing,
    layout: "/admin"
  }
];
