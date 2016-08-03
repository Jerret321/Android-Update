'use strict';

export default class extends think.controller.base {
	/**
	 * index action
	 * @return {Promise} []
	 */

	async indexAction(){
		const app_id = this.get('app_id');
		if(!app_id){
			return this.display('common/error/404');
		}
		let app_model = this.model('app');
		let apk_model = this.model('apk');
		let current_app = await app_model.get_info(app_id);
		let current_apk = await apk_model.get_latest(app_id);
		this.assign('current_app', current_app);
		this.assign('current_apk', current_apk);
		this.assign('os_types', global.OS_TYPES);

		this.display();
	}

}