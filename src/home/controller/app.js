'use strict';

import Base from './base.js';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	async indexAction(){
		const app_id = this.get('id');
		if(app_id){
			let apk_list = await this.model('apk').get_list({app_id: app_id});
			//console.log('apk_list', apk_list);
			this.assign('apk_list', apk_list);
		}
		return this.display();
	}

	async editAction(){
		var id = this.http.query.id;
		var appModel = this.model('app');
		if (this.http.isGet()){
			this.display();
		} else if(this.http.isPost()){
		}

	}


	async addAction(){
		if (this.http.isPost()){
			let query = {};
			const appModel = this.model('app');
			if (this.http.isAjax()){
				query = this.http.query;
			} else{
				query = global.uri2Query(await this.http.getPayload());
			}
			if(!query.name){
				return this.fail('APP_NAME_NOT_EMPTY');
			}
			query.is_force_update = query.is_force_update == 'on' ? 1 : 0;
			let app_id = await appModel.add_app(query);
			if (app_id){
				if (this.http.isAjax()){
					let app_info = await appModel.get_info(app_id);
					return this.success(app_info);
				} else{
					this.redirect(`/app?id=${app_id}`);
				}
			}
		}
		//auto render template file app_add.html
		return this.display();
	}
}