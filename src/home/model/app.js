'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async add_app({name, description = '', logo = '', os = 1 ,uid, is_force_update = 0}){
		let {key, secret} = this.generate_app_id_key();
		return await this.add({
			name           : name,
			description    : description,
			logo           : logo,
			uid            : uid,
			os             : os,
			key            : key,
			secret         : secret,
			is_force_update: is_force_update,
			update_time    : Date.now(),
			create_time    : Date.now()
		});
	}

	async get_list({os= 1, uid = null, page = 1, page_num = 10} = {os: 1, page: 1, page_num: 10}){
		let query = {status: 1, os: os};
		if (uid){
			think.extend(false, query, {uid: uid});
		}
		return await this.page(page, page_num).where(query).order('create_time DESC').select();
	}

	async get_info_key_secret({key, secret}){
		if(!key || !secret){
			return null;
		}
		return await this.where({status: 1, key: key, secret: secret})
			.field(['id', 'name', 'is_force_update', 'create_time'])
			.find();
	}

	async get_info(id){
		return await this.where({status: 1, id: id}).find();
	}

	generate_app_id_key(){
		return {
			key: think.uuid(),
			secret: think.uuid()
		}
	}
	async update_key(app_id){
		let {key, secret} = this.generate_app_id_key();
		return await this.where({id: app_id, status: 1}).update({
			key        : key,
			secret     : secret,
			update_time: Date.now()
		});
	}
	async update_info({id,name, description = '', logo = '', os = 1, qr = '' ,uid, is_force_update = 0} = {
		description: '', logo: '', os: 1, is_force_update: 0, qr: ''
	}){
		return await this.where({id: id, status: 1}).update({
			name       : name,
			description: description,
			logo       : logo,
			uid        : uid,
			os         : os,
			qr         : qr,
			update_time: Date.now()
		});
	}
}