'use strict';
/**
 * template config
 */

exports.__esModule = true;
exports.default = {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    nunjucks: {
      trimBlocks: false, //不转义
      prerender: function(nunjucks, env){
        env.filters.decodeURI = global.decodeURI;
        env.filters.datetime = (v) => {
          return think.datetime(new Date(v), 'YYYY-MM-DD HH:mm:ss');
        };
        return env;
      } //针对nunjucks模板的过滤器

    }
  }
};