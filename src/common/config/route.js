export default [
	[/^upload\/(.+)$/, 'home/index/download?path=:1'],
	[/^api\/apk\/post$/, '/home/api/apk/post'],
	[/^api\/app\/post/, '/home/api/app/post'],
	[/^share\/(\d+)/, 'share?app_id=:1']
];