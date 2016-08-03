'use strict';
/**
 * model
 */

export default class extends think.model.base {
	async add_apk({upload_id, version, log, app_id,uid}){
		return await this.add({
			upload_id: upload_id,
			version: version,
			log: log,
			app_id: app_id,
			uid: uid,
			update_time: Date.now(),
			create_time: Date.now()
		});
	}

	async get_info(apk_id){
		let result = await this.where({
			status: 1,
			id: apk_id
		}).find();
		let {upload_id} = result;
		if(upload_id){
			let options = await this.model('apk_upload').get_info(upload_id);
			return think.extend(result, options);
		}

	}

	async update_info(query){
		let {apk_id, create_time} = query;
		if(create_time){
			delete query.create_time;
		}
		if (apk_id){
			delete query.apk_id;
			query.update_time = Date.now();
			return await this.where({
				status: 1,
				id: apk_id
			}).update(query);
		}
	}
	async get_latest(app_id){
		var result = await this.where({app_id: app_id, status: 1}).order('create_time DESC').find();
		let {upload_id} = result;
		if(upload_id){
			let options = await this.model('apk_upload').get_info(upload_id);
			return think.extend(result, options);
		}
	}
	async get_list({app_id,  id, page = 1, page_num = 10} = {page: 1, page_num: 10}){
		let query = {
			status: 1
		};
		if (id){
			query.id = id;
		}
		if (app_id){
			query.app_id = app_id;
		}
		let result = await this.page(page, page_num).where(query).order('create_time DESC').select();
		const model = this.model('apk_upload');
		for (var i in result){
			let item = result[i];
			console.log('item', item)
			let apk_info = await model.get_info(item.upload_id);
			console.log(item.upload_id, apk_info);
			think.extend(item, apk_info);
			console.log(item);
		}
		return result;
	}

	__update_apk(){

	}
}