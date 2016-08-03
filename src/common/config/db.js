'use strict';

export default {
	type: 'mysql',
	adapter: {
		mysql: {
			host: '127.0.0.1',
			port: '3306',
			database: 'os_update',
			user: 'root',
			password: '',
			prefix: '',
			encoding: 'utf8'
		}
	}
};