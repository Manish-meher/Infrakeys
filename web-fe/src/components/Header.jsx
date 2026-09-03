"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { MdOutlineShoppingCart, MdOutlineLocalPhone } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import {
  Box,
  Handshake,
  HeartHandshake,
  Home,
  Info,
  LogOut,
  Menu,
  SquarePen,
  SquareUserRound,
} from "lucide-react";

import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import BrowseCategory from "./browse-category";
import { MainContext } from "@/store/context";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { cn } from "@/lib/utils";
import { HOME_SECTION_LINKS } from "@/data/site";

const size = 20;

// Merge note: kept Header.jsx's icon-labelled navList (with isHide flags) as the
// source of truth. Navbar.jsx's plain {title, href} list and its "?page=1" query
// param on Products were dropped in favor of this richer version — update the
// href below if pagination on first load is actually required.
export const navList = [
  { title: "Home", href: "/", icon: <Home size={size} />, isHide: false },
  { title: "About", href: "/about", icon: <Info size={size} />, isHide: false },
  {
    title: "Products",
    href: "/products",
    icon: <Box size={size} />,
    isHide: false,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: <SquarePen size={size} />,
    isHide: false,
  },
  {
    title: "Clientele",
    href: "/clientele",
    icon: <Handshake size={size} />,
    isHide: true,
  },
  {
    title: "Partners",
    href: "/our-partners",
    icon: <HeartHandshake size={size} />,
    isHide: true,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <SquareUserRound size={size} />,
    isHide: false,
  },
];

// const WHATSAPP_NUMBER = "+91 9811632400";
// const WHATSAPP_HREF = "https://wa.me/919811632400";

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.getAll);
  return data;
};

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 bg-white shadow-sm">
      <HeaderTop />
    </header>
  );
}

export const HeaderTop = () => {
  const pathname = usePathname();
  const { user, isUserLoading } = useContext(MainContext);
  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart-items", pathname],
    enabled: !!user,
  });

  return (
    <div className="container block">
      <Sheet>
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Logo */}
          <Link href={"/"} className="shrink-0">
            <Image
              width={128}
              height={60}
              src={"/logo.webp"}
              alt="logo"
              className="h-full w-full object-contain object-center"
            />
          </Link>

          {/* Browse-by-category dropdown (from Navbar.jsx), desktop only */}
          <div className="hidden lg:block">
            <BrowseCategory />
          </div>

          {/* Primary nav */}
          <nav className="ml-auto hidden lg:block">
            <ul className="flex items-center justify-start gap-2">
              {user && (
                <li>
                  <Link
                    href={"/profile/enquiries?status=pending_enquiry"}
                    className={cn(
                      `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                      {
                        "bg-primary text-white hover:bg-primary":
                          pathname.includes("profile"),
                      },
                    )}
                  >
                    <span>
                      <FiUser size={size} />
                    </span>
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {navList.map(
                ({ title, href, icon, isHide }) =>
                  !isHide && (
                    <li key={title}>
                      <Link
                        href={href}
                        className={cn(
                          `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                          {
                            "bg-primary text-white hover:bg-primary":
                              pathname === href,
                          },
                        )}
                      >
                        <span>{icon}</span>
                        <span>{title}</span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </nav>

          {/* WhatsApp / phone contact (from Navbar.jsx), desktop only */}
          {/* <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center gap-2 text-primary lg:flex"
          >
            <MdOutlineLocalPhone size={20} />
            <span className="text-sm">Whatsapp</span>
            <span className="text-base font-bold">{WHATSAPP_NUMBER}</span>
          </a> */}

          {/* Cart / auth, always visible */}
          <div className="flex items-center justify-center gap-4">
            {isUserLoading ? (
              <ProfileLoading />
            ) : user ? (
              <>
                <Link href={"/cart"} className="relative">
                  {data?.length ? (
                    <span className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                      {data?.length}
                    </span>
                  ) : (
                    <></>
                  )}
                  <MdOutlineShoppingCart size={25} />
                </Link>
                <Link
                  href={"/profile/enquiries?status=pending_enquiry"}
                  className="hidden lg:inline-block"
                >
                  <FiUser size={25} />
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center justify-center gap-1 text-sm text-gray-500 transition-colors hover:text-primary lg:flex"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link href={"/auth/login"} className={buttonVariants("primary")}>
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <SheetTrigger asChild className="ml-2 block lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center"
            >
              <Menu />
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent>
          <SheetHeader>
            <Link href={"/"}>
              <Image
                width={150}
                height={150}
                src={"/logo.webp"}
                alt="logo"
                className="object-contain object-center"
              />
            </Link>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            {/* Browse-by-category, mobile */}
            <div className="px-1">
              <BrowseCategory />
            </div>

            <ul className="space-y-2">
              {user && (
                <li>
                  <Link
                    href={"/profile/enquiries?status=pending_enquiry"}
                    className={cn(
                      `flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200`,
                      {
                        "bg-primary text-white hover:bg-primary":
                          pathname.includes("profile"),
                      },
                    )}
                  >
                    <span>
                      <FiUser size={size} />
                    </span>
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {navList.map(
                ({ href, icon, title, isHide }) =>
                  !isHide && (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          `flex items-center justify-start gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-gray-200`,
                          {
                            "bg-primary text-white hover:bg-primary":
                              pathname === href,
                          },
                        )}
                      >
                        <span>{icon}</span>
                        <span>{title}</span>
                      </Link>
                    </li>
                  ),
              )}
              {user && (
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center justify-start gap-2 rounded-lg px-3 py-3 text-left text-gray-500 transition-colors hover:bg-gray-200"
                  >
                    <LogOut size={size} />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>

            {/* WhatsApp / phone contact, mobile */}
            {/* <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-t px-3 pt-4 text-primary"
            >
              <MdOutlineLocalPhone size={20} />
              <span className="text-sm font-semibold">{WHATSAPP_NUMBER}</span>
            </a> */}

            {pathname === "/" && (
              <div className="border-t pt-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  On this page
                </p>
                <ul className="space-y-1">
                  {HOME_SECTION_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-200"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export function ProfileLoading() {
  return (
    <div className="h-10 w-16 animate-pulse rounded-md bg-gray-500/20"></div>
  );
}
