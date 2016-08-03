'use strict';

import Base from './base.js';
export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	async indexAction(){
		return this.display();
	}

	async editAction(){
		var apk_id = this.http.query.id;
		var app_id = this.http.query.app_id;

		const apkModel = this.model('apk');
		if (this.http.isPost()){
			let query;
			if (this.http.isAjax()){
				query = this.http.query;
			} else{
				query = global.uri2Query(await this.http.getPayload());
			}

			let effect_rows = await apkModel.update_info(query);
			if (effect_rows){
				if (this.http.isAjax()){
				} else{
					if (query.app_id){
						this.redirect(`/app?id=${query.app_id}`);
					}
				}
			}
		} else {
			let apk_info = await this.model('apk').get_info(apk_id);
			console.log('apk_info', apk_info);
			this.assign('current_apk', apk_info);
			this.display();
		}
	}

	async addAction(){
		const rules = global.R;
		if (this.http.isPost()){
			let query = {};
			const apkModel = this.model('apk');
			if (this.http.isAjax()){
				query = this.http.query;
			} else{
				query = global.uri2Query(await this.http.getPayload());
			}
			if (!query.upload_id){
				return this.fail(40001, '请上传apk包');
			}
			if (!query.version && rules.version.test(query.version)){
				return this.fail(40002, '版本号不能为空或不符合规则');
			}
			let apk_id = await apkModel.add_apk(query);
			if (apk_id){
				if (this.http.isAjax()){
				} else{
					if (query.app_id){
						this.redirect(`/app?id=${query.app_id}`);
					}
				}
			}
		} else{
			// render app_add.html
			return this.display();
		}
	}
}