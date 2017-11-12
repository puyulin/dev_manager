function simpleEncrypt($element){
		//产生八位随机码
		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';  
	    var maxPos = $chars.length;  
	    var key = '';
	    var len = 8;
	    var flag=true;
	    for (i = 0; i < len; i++) {  
	        key += $chars.charAt(Math.floor(Math.random() * maxPos));  
	    }
		//表单
		if($element.is("form")){
			$element.find(":password").each(function(){
				var encryptStr="";
				var pd=$(this).val();
				for(i=0;i<pd.length;i++){
					for(j=0;j<key.length;j++){
						var m=key.charCodeAt(j);
						var code=pd.charCodeAt(i)^m;
					}
					encryptStr+=String.fromCharCode(code);
				}
				$(this).val(Base64.encode(encryptStr+key));
			});
		}else if($element.is("input")){
			var encryptStr="";
			var pd=$element.val();
			for(i=0;i<pd.length;i++){
				for(j=0;j<key.length;j++){
					var m=key.charCodeAt(j);
					var code=pd.charCodeAt(i)^m;
				}
				encryptStr+=String.fromCharCode(code);
			}
			$(this).val(Base64.encode(encryptStr+key));
		}else{
			//console.log("传递的jquery对象为非表单或表单元素对象！");
			flag=false;
		}
		return flag;
	}
function encrypt(pd,key){
	var last="";
	for(i=0;i<pd.length;i++){
		for(j=0;j<key.length;j++){
			var m=key.charCodeAt(j);
			var text=pd.charCodeAt(i)^m;
		}
		last+=String.fromCharCode(text);
	}
	return last;
}
