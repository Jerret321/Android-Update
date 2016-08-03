/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */
global.uri2Query = (uri) => {
	console.log(uri);
	var arr = uri.split(/\&/g);
	var r = {};
	arr.forEach((item) => {
		var a = item.split('=');
		r[a[0]] = a[1];
	});
	return r;
};