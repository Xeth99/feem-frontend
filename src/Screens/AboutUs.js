import React from "react";
import Layout from "../Layout/Layout.js";
import Head from "../Components/Head.js";
import { useSelector } from "react-redux";

function AboutUs() {
  const { movies } = useSelector((state) => state.getAllMovies);
  const { users } = useSelector((state) => state.adminGetAllUsers);
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flex-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to Feem
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  We’re passionate about bringing you the best movie experience
                  in one place. Whether you’re looking for the latest
                  blockbusters, timeless classics, or hidden gems, we're here to
                  help you discover, save, and enjoy films effortlessly.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">
                    {movies?.length || "10K"}
                  </span>
                  <h4 className="text-lg font-semibold mb-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lovely movies ranging from all genres! Get your favorites
                    from all categories.
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">
                    {users ? (users?.length > 0 ? users?.length : 0) : "5K"}
                  </span>
                  <h4 className="text-lg font-semibold mb-2">Lovely Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely free, without registration hassle!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="/images/about2.jpeg"
                alt="aboutus"
                className="w-full xl:block hidden h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
