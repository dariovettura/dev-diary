import ImageFallback from "@/helpers/ImageFallback";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { humanize, markdownify } from "@/lib/utils/textConverter";
import config from "@/config/config.json";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import Button from "@/shortcodes/Button";
import { ButtonType, Feature, Post } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import Link from "next/link";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import BlogCard from "@/components/BlogCard";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];
const categories = getTaxonomy(blog_folder, "categories");
const allCategories = getAllTaxonomy(blog_folder, "categories");

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {


  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};



const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");

  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: ButtonType };
    features: Feature[];
  } = frontmatter;




  return (
    <>
      <SeoMeta />
      <section className=" pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-16 text-center lg:col-7">
              <h1
                className="mb-4"
              // dangerouslySetInnerHTML={markdownify(banner.title)}
              >The Ultimate Stack You Need To Start Your Next Project</h1>
              <p
                className="mb-8"
              // dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              >
                {/* Greetings, everyone! I'm Dario, and I've finally discovered
              the ultimate stack for managing all the online goodness. */}
                Sales,
                events, portfolios, blogs, and anything you can dream of—all while saving you a ton of time! 🌟🕒</p>
              <Button link="/" label="Want to Know How It Works?" />
              {/* {banner.button!.enable && (
                <a className="btn btn-primary" href={banner.button!.link}>
                  {banner.button!.label}
                </a>
              )} */}
            </div>
            {banner.image && (
              <div className="col-12">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="">
        <div className="container text-center">

            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              const posts: Post[] = getSinglePage(blog_folder);
              const filterByCategories = taxonomyFilter(posts, "categories", category);
              return (
                <div className="m-3 inline-block" key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className="flex items-center px-4 py-8 text-xl text-dark  dark:text-darkmode-dark"
                  >
                   <h2> {humanize(category)}</h2>
                    <span className="ml-2 rounded bg-theme-light px-2 dark:bg-darkmode-body">
                      {count}
                    </span>
                  </Link>
                  <div className="row ">
                  {filterByCategories.map((post: Post, index: number) => (
              <div className="mb-14 md:col-12 lg:col-4" key={index}>
                <BlogCard data={post} />
              </div>
            ))}
            </div>
                </div>
              );
            })}

        </div>
      </section>

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
