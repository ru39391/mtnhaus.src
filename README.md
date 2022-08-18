# Базовый шаблон для быстрого старта разработки

[Профиль на freelance.ru](https://freelance.ru/nutheadbeast/)

## Техническая информация:

- используется node v12.16.3 и выше
- dev-режим **npm run dev**
- prod-режим **npm run build**

## Дополнить:

- настроить splitChunks для optimization;
- подключение сторонних плагинов js в `[name].bundle.js`;
- скорректировать пути к иконкам из svg, подключаемым через mixin.pug (лишний /);
- корректное подключение favicon.ico;
- настроить `"watch": "nodemon --watch 'src/**/*' --exec 'npm run build'"`, см. ссылки [nodemon 1.18.9 not working in windows 10 *64 #1501](https://github.com/remy/nodemon/issues/1501#issuecomment-541460330) и [. #1619](https://github.com/remy/nodemon/issues/1619#issuecomment-544145862);
- добавить stylelint и eslint (или другие линтеры, найти в избранном соотв. статью с обзором);
- разобраться с опциями HtmlWebpackPlugin, см. ссылки
	* [Using HTMLWebpackPlugin and Pug](https://extri.co/2017/05/23/using-htmlwebpackplugin-and-pug/)
	* [Как вставить скрипт в html через webpack?](https://qna.habr.com/q/602939)
	* [jaketrent/html-webpack-template](https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html)
	* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
	* [Pre-compile pug templates and save access to htmlWebpackPlugin.options](https://stackoverflow.com/questions/56558741/pre-compile-pug-templates-and-save-access-to-htmlwebpackplugin-options)
	* и ещё одна, найти в избранном: речь шла об отказе от inject: true в пользу использования условий.