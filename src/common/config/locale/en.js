'use strict';

export default {
	USER_EXISTS: [10001, '用户已存在'],
	USER_NOT_EXISTS: [10002, '用户不存在'],
	PASSWORD_INVALID: [10003, '密码错误'],
	UPLOAD_ERR_TYPE: [20001, '上传文件类型错误'],
	LACK_APP_ID: [20002, '缺少app_id'],
	APP_NOT_EXIST: [20003, 'app_id对应的app不存在'],
	UPLOAD_EMPTY_FILE: [20004, '上传文件为空'],
	APP_NAME_NOT_EMPTY: [30001, 'app name不能为空'],
	APP_KEY_SECRET_ERROR: [30002, 'app key或secret错误,请检查'],
	APP_PACKAGE_NOT_MATCH: [30003, 'app package不匹配']
};