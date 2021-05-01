import * as fs from "fs";
import { QiitaArticle } from "../lib/qiita-article";

const qiitaDir = "articles/qiita";
const zennDir = "articles/zenn";

const getArticleFiles: () => Promise<string[]> = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(qiitaDir, (err, files) => {
      if (err) {
        reject(err);
      }
      const articles = files.filter((file) => file.includes(".json"));
      resolve(articles);
    });
  });
};

const migrateQiitaToZenn = (fileName: string) => {
  // RESPECT: [Qiita の記事を zenn に移行したときにしたこと](https://zenn.dev/luna_chevalier/articles/ca9cb142a3111944f6af)
  const qiitaArticle: QiitaArticle = require(`../${qiitaDir}/${fileName}`);
  const zennArticle = `---
title: "${qiitaArticle.title}"
emoji: "🔖"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["${qiitaArticle.tags.map((tag) => tag.name).join('","')}"]
published: true
---
${qiitaArticle.body}
`;
  fs.writeFileSync(
    `${zennDir}/${fileName.replace(".json", ".md")}`,
    zennArticle
  );
};

const main = async () => {
  const articleFiles = await getArticleFiles();
  articleFiles.forEach((article) => migrateQiitaToZenn(article));
};

main();
