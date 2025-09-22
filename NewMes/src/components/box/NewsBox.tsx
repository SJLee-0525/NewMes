import type { NewsArticle } from "@/types/newsType";

import { getFormattedDateTime } from "@utils/formatDate";

const NewsBox = ({ article }: { article: NewsArticle }) => {
  const publishedAt = getFormattedDateTime(article.publishedAt);

  function handleClick() {
    if (article.url) {
      window.open(article.url, "_blank");
    }
  }

  return (
    <section
      className="group flex flex-col justify-start items-center w-full h-full rounded-xl bg-inactive border border-transparent hover:border-mainPurple/70 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick();
      }}
      title={`${article.description || article.content || ""}\n\n(Click to read more)`}
    >
      {article.urlToImage && (
        <figure className="w-full aspect-[16/9] overflow-hidden rounded-t-xl">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </figure>
      )}

      <section className="flex flex-col justify-center items-start w-full h-fit p-4 gap-2">
        <p className="w-full h-fit font-pre-regular text-icon text-left">
          {article.source.name} · <small>{publishedAt}</small>
        </p>

        <header className="flex justify-between items-start w-full min-h-10">
          <h2 className="w-full h-fit font-pre-semi-bold text-xl text-white text-left whitespace-wrap">
            {article.title}
          </h2>
        </header>
      </section>
    </section>
  );
};

export default NewsBox;
