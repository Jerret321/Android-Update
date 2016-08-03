import Base from './base';

export default class extends Base {
	async postAction(){
		const params = this.post();
		const app_info = await this.model('app').get_info_key_secret(params);
		if(app_info){
			const latest_apk = await this.model('apk').get_latest(app_info.id);
			if(latest_apk){
				let options = JSON.parse(latest_apk.options);
				if(options.package != params.package){
					return this.fail('APP_PACKAGE_NOT_MATCH');
				}
				// latest apk version > params.version_code, update the apk
				let result = {need_update: options.versionCode > params.version_code};
				if(result.need_update){
					return this.success(think.extend(result, app_info, {url: `http://${this.http.host}${latest_apk.url}`}));
				} else {
					return this.success(result);
				}
			}
		} else if(app_info == null){
			return this.fail('APP_KEY_SECRET_ERROR');
		} else {

		}
	}
}
