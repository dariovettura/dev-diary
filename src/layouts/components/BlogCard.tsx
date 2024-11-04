import config from "@/config/config.json";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder,  FaRegCalendar } from "react-icons/fa/index.js";
import ImageFallback from "../helpers/ImageFallback";


const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { title, image, categories, date } = data.frontmatter;
  return (
    <div className="bg-body dark:bg-darkmode-body">
      <div  className={`mb:md-0 mb-6`}>
        <div className="shadow-[10px_10px] dark:bg-darkmode-body shadow-dark dark:shadow-white relative p-5 col-span-3 h-full rounded-2xl border-2 border-solid dark:border-white border-dark bg-white  xl:col-span-4 md:col-span-8 md:order-1 ">

          <div className="relative  col-span-3 rounded-2xl border-2 border-solid border-dark  dark:border-white  bg-white   xl:col-span-4 md:col-span-8 md:order-1 ">
          {image && (
            <ImageFallback
              className=" w-full rounded-2xl"
              src={image}
              alt={title}
              width={445}
              height={230}
            />
          )}
          </div>
          <h4 className="mb-3 mt-3">
        <Link href={`/${blog_folder}/${data.slug}`}>{title}</Link>
      </h4>
      <ul className="mb-4">
        <li className="mr-4 inline-block">
        <FaRegCalendar className={"-mt-1 mr-2 inline-block"} />
        {date && <span className="inline-block">{dateFormat(date)}</span>}
        </li>
        <li className="mr-4 inline-block">
          <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
          {categories?.map((category: string, index: number) => (
            <Link key={index} href={`/categories/${slugify(category)}`}>
              {humanize(category)}
              {index !== categories.length - 1 && ", "}
            </Link>
          ))}
        </li>

      </ul>
      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
      <Link
        className="btn btn-outline-primary btn-sm"
        href={`/${blog_folder}/${data.slug}`}
      >
        read more
      </Link>
        </div>

      </div>


    </div>
  );
};

export default BlogCard;
