import { HomeSection } from "@/components/home/home";
import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminNav from "./dashboard/_components/admin-nav";
import Services from "@/components/home/services";
import ContactMe from "../../components/contact/contact-me";
import BlogPost from "@/components/blog/blog-post";
import Faq from "../../components/faq";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col flex-1 h-full ">
      <section id="home" className=" items-center justify-center text-center">
        <HomeSection />
        {currentUser && currentUser?.userRole === "ADMIN" && (
          <div>
            <AdminNav />
          </div>
        )}
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Faq />
      </section>
      <section>
        <ContactMe />
      </section>
    </div>
  );
}
