import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import Button from "@/shortcodes/Button";
import { ButtonType, Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";

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
      <section className="section pt-14">
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

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient  relative"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                style={{ height: 400 }}
                className={`mb:md-0 mb-6 md:col-5 h-400 ${index % 2 !== 0 && "md:order-2"
                  }`}
              >
                <div className="shadow-[10px_10px] shadow-dark relative p-5 col-span-3 h-full rounded-2xl border-2 border-solid border-dark bg-white  xl:col-span-4 md:col-span-8 md:order-1 ">
                  <div className="relative h-[90%] col-span-3 rounded-2xl border-2 border-solid border-dark  bg-white p-8  xl:col-span-4 md:col-span-8 md:order-1 "></div>
                </div>

              </div>
              <div
                className={`md:col-7 lg:col-6 ${index % 2 !== 0 && "md:order-1"
                  }`}
              >
                <h2
                  className="mb-4"

                >Built to Meet Your Needs. Introducing GESTIO</h2>
                <p
                  className="mb-8 text-lg"

                ><b>GESTIO</b> is your personal management system, fully customizable to fit your requirements.
                  Fast, secure, equipped with everything you need to efficiently handle your content and affairs.
                   Packed with features that will blow your mind.</p>
                <ul>
                {/* <li className="relative mb-4 pl-6" >
                    <FaCheck className={"absolute left-0 top-1.5"} />
                    <span> Equipped with Various Payment Gateways</span>
                  </li> */}

                  <li className="relative mb-4 pl-6" >
                    <FaCheck className={"absolute left-0 top-1.5"} />
                    <span>Push Notifications and Email notice</span>
                  </li>
                  <li className="relative mb-4 pl-6" >
                    <FaCheck className={"absolute left-0 top-1.5"} />
                    <span>Multiuser and Role-Based Functionality</span>
                  </li>
                  <li className="relative mb-4 pl-6" >
                    <FaCheck className={"absolute left-0 top-1.5"} />
                    <span>Easily Integratable into Existing Projects</span>
                  </li>
                  <Button link="/" label="Discover all app features" />
                  {/* <li className="relative mb-4 pl-6" >
                    <FaCheck className={"absolute left-0 top-1.5"} />
                    <span>Available in both Native App and Progressive Web App Versions</span>
                  </li> */}

                  {/* {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li> */}
                  {/* ))} */}
                </ul>
                {feature.button.enable && (
                  <a
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
