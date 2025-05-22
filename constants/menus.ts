import {
  LucideCircle,
  LucideCircleHelp,
  LucideHome,
  LucideMessageCircle,
  LucideSettings,
} from "lucide-vue-next";
import type { NavMenu, NavMenuItems } from "../types/nav";

export const navMenu: NavMenu[] = [
  {
    heading: "General",
    items: [
      {
        title: "Home",
        icon: LucideHome,
        link: "/",
      },
      {
        title: "Items",
        icon: LucideCircle,
        link: "/items",
      },
      {
        title: "Chat",
        icon: LucideMessageCircle,
        link: "/chat",
      },
      {
        title: "Settings",
        icon: LucideSettings,
        link: "/settings",
      },
    ],
  },
];

export const navMenuBottom: NavMenuItems = [
  {
    title: "Help & Support",
    icon: LucideCircleHelp,
    link: "/about",
  },
];
