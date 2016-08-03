// 记录一些web config
global.webConfig = {
	url: `http://127.0.0.1${think.config('port')}`
};
global.R = {
	version: /\d+\.\d+\.\d+/
};
global.OS_TYPES = [
	{
		type: 1,
		name: 'Android'
	},
	{
		type: 2,
		name: 'iOS'
	}
];