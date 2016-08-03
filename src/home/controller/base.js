'use strict';

export default class extends think.controller.base {
	async __before(){
		const ignore_list = ['user', 'share'];
		if (ignore_list.indexOf(this.http.controller) > -1){
			return;
		}
		var current_user = await this.session('current_user');
		if (!current_user){
			this.redirect('/user/login');
		}
		let userModel = this.model('user');
		let appModel = this.model('app');

		let app_list = await appModel.get_list(current_user);
		let current_app;
		if (this.http.controller == 'app' &&
			this.http.query.id &&
			['edit', 'index'].indexOf(this.http.action) > -1){
			current_app = appModel.get_info(this.http.query.id);
		} else if (this.http.controller == 'apk' &&
			this.http.query.app_id
		){
			current_app = appModel.get_info(this.http.query.app_id);
		}
		this.assign('os_types', global.OS_TYPES);
		const role = current_user.role == 2 ? '管理员' : '开发者';
		this.assign('user', think.extend(false, current_user, {role: role}));
		this.assign('current_app', current_app);
		this.assign('app_list', app_list);
	}

	async __call(){

		if (this.isAjax()){
			return this.fail('ACTION_NOT_FOUND');
		}
		var userModel = this.model('user');
		var user_list = await userModel.get_list();
		if (user_list.length == 0){
			const password = '123qwe';
			var result = await userModel.add_many_user([{
				username: '小于',
				password: password,
				mobile: 17090119970,
				role: 2
			}]);
		}
		if (this.http.controller == 'user'){
			this.redirect('/user/login');
		}
	}
}