'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async add_user({username, password, role = 1}){
		return await this.add({
			username: username,
			password: think.md5(`hex_${password}`),
			create_time: Date.now(),
			role: role
		});
	}
	validate_password(password, db_password){
		return think.md5(`hex_${password}`) == db_password;
	}
	async get_info(query){
		if(query.id){
			return await this.where({id: query.id}).find();
		} else if(query.mobile){
			return await this.where({mobile: query.mobile}).find();
		}
	}
	async add_many_user(list){
		let now = Date.now();
		list.map( (item) => {
			item.password = think.md5(`hex_${item.password}`);
			item.create_time = now;
			item.update_time = now;
		});
		return await this.addMany(list);
	}
	async get_list({page = 1, page_num = 10} = {page: 1, page_num: 10}){
		return await this.page(page, page_num).where({status: 1}).select();
	}
	async __update_user(uid, query){
		return await this.where({id: uid}).update(query);
	}
}