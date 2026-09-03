import { H1 } from "@/components/ui/typography";
import Image from "next/image";

export const metadata = {
  title: "Clientele | Infrakeys",
  description: "Infrakeys Clientele",
  openGraph: {
    title: "Infrakeys Clientele",
    description: "Infrakeys Clientele",
  },
  alternates: {
    canonical: `/clientele`,
  },
};

export default function Page() {
  return (
    <div className="h-full p-4">
      <div className="container">
        <div className="">
          <H1 className={"my-8 text-center"}>Our Clientele</H1>
        </div>
        <div>
          <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              "/clientele/Ahulwalia_Contracts.webp",
              "/clientele/Interarch_logo.webp",
              "/clientele/KALPATPOWR.NS_logo.webp",
              "/clientele/Kirby.webp",
              "/clientele/L&T.webp",
              "/clientele/Navayuga.webp",
              "/clientele/NCRTC_LOGO.webp",
              "/clientele/Shapoorji_Pallonji.webp",
              "/clientele/Tata_Projects_Logo.webp",
              "/clientele/adani.webp",
              "/clientele/amns.webp",
              "/clientele/bhel.webp",
              "/clientele/dmrc.webp",
              "/clientele/gmr.webp",
              "/clientele/iocl.webp",
              "/clientele/nbcc.webp",
              "/clientele/nhai.webp",
              "/clientele/ozone.webp",
            ].map((item, key) => (
              <div key={key} className="rounded-2xl bg-gray-50 p-4">
                <Image
                  width={1000}
                  height={1000}
                  src={item}
                  alt={item
                    .replace("/", "")
                    .replace(".webp", "")
                    .replace(".", "")
                    .split("_")
                    .join(" ")}
                  className="aspect-video object-contain object-center mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
