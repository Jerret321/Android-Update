'use strict';

import Base from './base.js';
import url from 'url';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	indexAction(){
		//auto render template file index_index.html
		return this.display();
	}


	async logoutAction(){
		await this.session('current_user', null);
		this.redirect('/user/login');
	}

	async loginAction(){
		if (this.http.isPost()){
			const instance = this.model('user');
			var query = this.http.isAjax() ? this.http.query : global.uri2Query(await this.http.getPayload());

			let {mobile, password} = query;
			let user_info = await instance.get_info(query);
			if (think.isEmpty(user_info)){
				return this.fail('USER_NOT_EXISTS');
			}
			if (!instance.validate_password(password, user_info.password)){
				return this.fail('PASSWORD_INVALID');
			}
			delete user_info.password;
			delete user_info.status;
			await this.session('current_user', user_info);
			if (this.http.isAjax()){
				return this.success('LOGIN_SUCCESS');
			}
			this.redirect('/app');

		} else{
			this.display();
		}
	}
}