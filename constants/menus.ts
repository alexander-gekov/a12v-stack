import {
  LucideCircle,
  LucideCircleHelp,
  LucideGithub,
  LucideHome,
  LucideLinkedin,
  LucideMessageCircle,
  LucideSettings,
  LucideTwitter,
  LucideX,
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
  {
    heading: "Socials",
    items: [
      {
        title: "GitHub",
        icon: LucideGithub,
        link: "https://github.com/alexander-gekov",
      },
      {
        title: "LinkedIn",
        icon: LucideLinkedin,
        link: "https://www.linkedin.com/in/alexander-gekov/",
      },
      {
        title: "X.com",
        icon: LucideTwitter,
        link: "https://x.com/AlexanderGekov",
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
