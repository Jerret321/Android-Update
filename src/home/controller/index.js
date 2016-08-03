'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */

  indexAction(){
    var app_list = this.assign('app_list');
    if(app_list.length > 0){
      this.redirect(`/app/?id=${app_list[0].id}`)
    } else {
      this.redirect('/app');
    }
  }

  async downloadAction(){
    var path = this.get('path');
    console.log('path', path);
    if(!path){
      this.fail('60001', '文件不存在');
    } else {
      this.download(`${think.RESOURCE_PATH}/upload/${path}`);
    }
  }
}