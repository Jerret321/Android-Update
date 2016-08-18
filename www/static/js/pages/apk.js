$(function (){
	var app_id = $('#app-id').val();
	$('#file-upload').on('change', function (e){
		var self = this;
		var fd = new FormData();
		var files = e.target.files;
		if (files.length > 0){
			fd.append('apk', files[0]);
			fd.append('app_id', app_id);
		} else{
			return;
		}
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = (evt.loaded / evt.total).toFixed(2);
						var percent = percentComplete * 100 + '%';
						$('#progress').css({
							width: percent
						}).html(percent).parent().show();
					}
				}, false);

				return xhr;
			},
			url: '/api/apk/post',
			type: 'POST',
			cache: false,
			data: fd,
			processData: false,
			contentType: false
		}).done(function (res){
			self.value = '';
			console.log(res);
			if(res.code == 0){
				$('#upload_id').val(res.data.upload_id);
				$('#apk-info pre').text(res.data.options);
				$('#progress').html('').parent().hide();
				$('#apk-info').show();
			}
		}).fail(function (res){
			self.value = '';
		});
	});
});