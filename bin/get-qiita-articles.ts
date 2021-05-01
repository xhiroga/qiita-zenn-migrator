import * as fs from "fs";
import { AxiosRequestConfig, default as axios } from "axios";
import { QiitaArticle } from "../lib/qiita-article";

const USER_ID = process.env["USER_ID"];
if (USER_ID === undefined) {
  throw Error("run `export USER_ID=$YOUR_QIITA_USER_ID` before run script.");
}

const MAXIMUM_PAGE_COUNT = 100;

const getQiitaArticles = async (userId: string, page: number = 1) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://qiita.com/api/v2/users/${userId}/items?page=${page}&per_page=100`,
    headers: {},
  };
  return await axios(config).then(
    (response) => response.data as QiitaArticle[]
  );
};

const saveQiitaArticles = (articles: QiitaArticle[]) => {
  articles.forEach((article) => {
    const fileName = `articles/qiita/${article.id}.json`;
    fs.writeFileSync(fileName, JSON.stringify(article, null, 2));
  });
};

const main = async () => {
  var page = 1;
  while (page <= MAXIMUM_PAGE_COUNT) {
    const pages = await getQiitaArticles(USER_ID, page);
    if (pages.length === 0) {
      console.log("all articles are fetched.");
      break;
    }
    saveQiitaArticles(pages);
    page++;
  }
};

main();
