let versions = [];

for(var i = 0; i < 5; i++){
	for(var m = 0; m < 20; m++){
		for(var n = 0; n < 10; n++){
			versions.push(`${i}.${m}.${n}`);
		}
	}
}
export default versions;