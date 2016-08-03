import Base from './base';
import fs from 'fs';
import path from 'path';
import ApkReader from 'node-apk-parser';
import util from 'util';

export default class extends Base {
	async postAction(){
		var app_id = this.post('app_id');
		if (!app_id){
			return this.fail('LACK_APP_ID');
		} else{
			let app_info = await this.model('app').get_info(app_id);
			if (!app_info){
				return this.fail('APP_NOT_EXIST');
			}
		}

		const allow_types = ['apk'];
		const apk_file = this.file('apk');
		if (think.isEmpty(apk_file)){
			return this.fail('UPLOAD_EMPTY_FILE');
		}
		let file_type = apk_file.originalFilename.split(/\./g).pop();
		if (allow_types.indexOf(file_type) == -1){
			return this.fail('UPLOAD_ERR_TYPE');
		}


		var file = this.__uploadFile(apk_file);
		let options = this.__extracApk(file.path);
		let post_query = {
			versionCode: options.versionCode,
			versionName: options.versionName,
			package: options.package
		};
		let query = {
			app_id: app_id,
			options: JSON.stringify(post_query),
			url: file.path.replace(think.RESOURCE_PATH, '')
		};
		const apkUploadModel = this.model('apk_upload');
		query.uid = this.session('current_user').id;
		let result = await apkUploadModel.add_apk_upload(query);
		if(result){
			return this.success(think.extend({}, query, {upload_id: result}));
		}
	}

	__uploadFile(f){
		var file = think.extend({}, f);
		var filepath = file.path;
		//文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
		var uploadPath = think.RESOURCE_PATH + '/upload';
		think.mkdir(uploadPath);
		var basename = path.basename(filepath);
		fs.renameSync(filepath, uploadPath + '/' + basename);
		file.path = uploadPath + '/' + basename;
		return file;
	}

	__extracApk(file_path){
		var reader = ApkReader.readFile(file_path);
		// FIXME: 是否可以异步读取
		return reader.readManifestSync(file_path);
		//return new Promise(function (resolev, reject){
		//	reader.readManifest(function (err, result){
		//		if (err){
		//			reject(err);
		//		} else{
		//			resolve(result);
		//		}
		//	})
		//});
	}
}
