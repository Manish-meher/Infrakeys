"use client";
import React, { useContext, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams, usePathname, useRouter } from "next/navigation";
import { allRoutes } from "@/data/routes";
import { MainContext } from "@/store/context";
import Spinner from "../Spinner";
import InfraBuddy from "../infra-buddy";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams();
  const { user, isUserLoading } = useContext(MainContext);

  useEffect(() => {
    if (
      pathname === "/auth/login" ||
      pathname === "/auth/signup" ||
      pathname === "/auth/verify"
    ) {
      return;
    }
    if (isUserLoading) return;

    // Find the current route in the AllRoutes array
    const currentRoute = allRoutes?.find(
      (route) => route.link === pathname.replace("[slug]", slug),
    );

    // If the current route is not found in the array or the user's role is not allowed for this route
    if (
      currentRoute &&
      currentRoute?.roles?.length &&
      !currentRoute?.roles?.includes(user?.role)
    ) {
      localStorage.clear();
      router.replace("/auth/login");
    }
  }, [pathname, user, isUserLoading, slug]);

  // Only role-protected routes wait for the profile call. Public pages used to
  // be blocked too, which meant they were served as a bare spinner (nothing to
  // index and a blank first paint).
  const currentRoute = allRoutes?.find(
    (route) => route.link === pathname.replace("[slug]", slug),
  );
  const isProtectedRoute = Boolean(currentRoute?.roles?.length);

  if (isUserLoading && isProtectedRoute) return <Spinner />;

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <div className="h-full">{children}</div>
      </main>
      <Footer />
      <InfraBuddy />
    </div>
  );
}
