import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import { Login } from "../auth/login";
import { Forgot } from "../auth/forgot";
import { Otp } from "../auth/otp";
import { Reset } from "../auth/reset";
import { Register } from "../auth/register";
import { UserManagement } from "../pages/UserManagement";
import { BotsManagement } from "../pages/BotsManagement";
import { Support } from "../pages/Support";
import { UserActivity } from "../pages/UserActivity";
import { BotExecution } from "../pages/BotExecution";
import { AdminActivity } from "../pages/AdminActivity";
import { SubPayment } from "../pages/SubPayement";
import { UserDetail } from "../pages/UserDetail";
import { PricingPlan } from "../pages/PricingPlan";
import { AddPlan } from "../pages/AddPlan";
import { ProfileSetting } from "../pages/ProfileSetting";
import { Profile } from "../pages/Profile";
import { SupportChat } from "../pages/SupportChat";
import { Notification } from "../pages/Notification";

export default function AppRoutes() {
  const routes = [
    {
      name: "Login",
      path: "/",
      Component: Login,
    },
    {
      name: "Forgot",
      path: "/forgot",
      Component: Forgot,
    },
    {
      name: "Otp",
      path: "/otp",
      Component: Otp,
    },
    {
      name: "Reset",
      path: "/reset",
      Component: Reset,
    },
    {
      name: "Register",
      path: "/register",
      Component: Register,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      Component: Dashboard,
    },
    {
      name: "UserManagement",
      path: "/user-management",
      Component: UserManagement,
    },
    {
      name: "UserDetail",
      path: "/user-detail/:id",
      Component: UserDetail,
    },
    {
      name: "BotsManagement",
      path: "/bot-management",
      Component: BotsManagement,
    },
    {
      name: "SubPayment",
      path: "/sub-payment",
      Component: SubPayment,
    },
    {
      name: "PricingPlan",
      path: "/pricing-plan",
      Component: PricingPlan,
    },
    {
      name: "AddPlan",
      path: "/add-plan",
      Component: AddPlan,
    },
    {
      name: "BotExecution",
      path: "/bot-execution",
      Component: BotExecution,
    },
    {
      name: "AdminActivity",
      path: "/admin-activity",
      Component: AdminActivity,
    },
    {
      name: "UserActivity",
      path: "/user-activity",
      Component: UserActivity,
    },

    {
      name: "Support",
      path: "/support",
      Component: Support,
    },
    {
      name: "SupportChat",
      path: "/support-chat/:id",
      Component: SupportChat,
    },
    {
      name: "ProfileSetting",
      path: "/profile-setting",
      Component: ProfileSetting,
    },
    {
      name: "Profile",
      path: "/profile",
      Component: Profile,
    },
    {
      name: "Notification",
      path: "/notification",
      Component: Notification,
    },
  ];

  // ROUTES MAPING
  const Routing = routes.map(({ name, path, Component }, i) => (
    <Route key={i} path={path} element={<Component />} />
  ));

  return (
    <div>
      <Routes>{Routing}</Routes>
    </div>
  );
}
