'use strict';
/**
 * model
 */

export default class extends think.model.base {
	async add_apk_upload({app_id, url, options, uid}){
		return await this.add({
			app_id     : app_id,
			url        : url,
			options    : options,
			create_time: Date.now(),
			update_time: Date.now(),
			uid        : uid
		});
	}

	async get_info(upload_id){
		return await this.where({
			upload_id: upload_id
		}).find();
	}

	async get_list({app_id, page = 1, page_num = 10} = {page: 1, page_num: 10}){
		//var result = await this.where({app_id: app_id}).order('create_time DESC').select();
		//for (let i of result){
		//	result[i][''];
		//}
	}

	async update_info(query){
		const {app_id} = query;
		if (app_id){
			delete query.app_id;
			return await this.where({app_id: app_id}).update(query);
		}
	}
}