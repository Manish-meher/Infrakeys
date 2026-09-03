import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { CONTACT, ROUTES, SOCIALS } from "@/data/site";

const FOOTER_LINKS = [
  { label: "home", href: ROUTES.home },
  { label: "about", href: ROUTES.about },
  { label: "products", href: ROUTES.products },
  { label: "blogs", href: ROUTES.blogs },
  { label: "news", href: ROUTES.news },
  { label: "contact", href: ROUTES.contact },
];

export default function Footer() {
  return (
    <footer className="divide-y-2 divide-gray-100 border-t bg-white">
      <div className="container space-y-4 py-10">
        <div className="flex flex-col items-center justify-center">
          <figure className="inline-block rounded-lg p-2">
            <Image src={"/logo.webp"} width={100} height={100} alt="logo" />
          </figure>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
          </Button>
          {/* <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a href="javascript:void(0);">
              <FaXTwitter size={20} />
            </a>
          </Button> */}
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-black transition-transform hover:-translate-y-1"
          >
            <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={20} />
            </a>
          </Button>
        </div>

        <div className="">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-8">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm capitalize transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 grid w-full grid-cols-12 gap-4 text-sm text-gray-900">
          <div
            className={
              "col-span-12 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2 sm:col-span-6 lg:col-span-4"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <PhoneCall />
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <p>
                <a href={CONTACT.phoneHref} className="hover:text-primary">
                  {CONTACT.phone}
                </a>
              </p>
            </div>
          </div>

          <div
            className={
              "col-span-12 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2 sm:col-span-6 lg:col-span-4"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <Mail />
            </div>
            <div>
              <span className="font-semibold">Email</span>
              <p>
                <a href={CONTACT.emailHref} className="hover:text-primary">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          <div
            className={
              "col-span-12 flex h-full items-center justify-start gap-2 rounded-lg border bg-white p-2 lg:col-span-4"
            }
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white">
              <MapPin />
            </div>
            <div>
              <span className="font-semibold">Address</span>
              <p>
                519-521, 5th floor, The Business Hub, Sector-81, <br /> Greater
                Faridabad, 121007, Haryana
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="bg-black text-white">
        <div className="container flex items-center justify-between py-3 text-xs sm:text-sm">
          <span>Copyright © {new Date().getFullYear()} by Infrakeys</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
