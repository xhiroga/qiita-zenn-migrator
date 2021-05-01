# qiita-zenn-migrator

migrate qiita article to zenn.  
RESPECT: [Qiita の記事を zenn に移行したときにしたこと](https://zenn.dev/luna_chevalier/articles/ca9cb142a3111944f6af)

## How to use

```shell
# 1. Qiitaの記事をダウンロードします。 / download Qiita articles.
USER_ID=$YOUR_QIITA_USER_ID yarn get-qiita-articles

# 2. zenn.devにおけるslugを決めます。 / rename files if you fix slug.
mv articles/qiita/hogehoge.json articles/qiita/awesome-title.json
...

# 3. zenn.devに移行しない記事を手動で削除します。 / remove articles which are not migration target by hand.
rm articles/qiita/not-migration-target.json
...


# 4. 記事をzenn.dev形式に変換します。 / migrate articles
yarn migrate-articles
```

## Disclaimer

This repository is not official. If you use this, with your own responsibility.

## References

- [Qiita: Developer - API v2](https://qiita.com/api/v2/docs)
