/**
 * base rest controller
 */
export default class extends think.controller.rest {
	/**
	 * allow list for user
	 * @type {Array}
	 */
	publicList = ['api/app/post'];

	/**
	 * [constructor description]
	 * @param  {[type]} http [description]
	 * @return {[type]}      [description]
	 */
	constructor(http){
		super(http);
		this._method = 'method';
	}

	/**
	 * before
	 * @return {} []
	 */
	async __before(){
		let userInfo = await this.session('current_user') || {};
		let action = `${this.http.controller}/${this.http.action}`;
		if (this.publicList.indexOf(action) > -1){

		} else if (think.isEmpty(userInfo)){
			return this.fail('USER_NOT_LOGIN');
		}
	}
}
