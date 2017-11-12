/**
 * 多线程辅助工具类
 */
onmessage = function(event) {
	var data = event.data;
	var command = data.method;
	var arguments = data.arguments;
	if(command === 'convertToFueluxTreeData'){
		postMessage(convertToFueluxTreeData(arguments));
	}
}

function convertToFueluxTreeData(arguments){
	var totalArr = arguments.arr;
	var options = arguments.options;
	var newTotalArr = [];
    // 如果这个数组已经是好的tree结构，则什么都不做，退出即可
    if (totalArr[0] && totalArr[0].hasOwnProperty('additionalParameters')) return totalArr;
    // 如果数组中没有id
    for (var key in totalArr) {
        var obj = totalArr[key];
        var newNode = {};
        newNode.id = options.idField ? obj[options.idField] : obj[id];
        newNode.pId = options.pIdField ? obj[options.pIdField] : obj[pId];
        newNode.name = options.nameField ? obj[options.nameField] : obj[name];
        newNode.type = 'item'; //默认开始时所有的对象都没有父节点
        newNode.additionalParameters = {};
        newNode.additionalParameters.children = [];
        if(options.selectedIds && options.selectedIds.indexOf(newNode.id)!=-1) 
        	newNode.additionalParameters['item-selected'] = true;
        newNode.data = obj;
        newNode.dataAttributes = {};
        newNode.dataAttributes.id = newNode.id;
        newTotalArr.push(newNode);
    }
    // 将普通数组转化为FueluxTree需要的数组
    // 定义根级别对象数组rootArr
    var rootArr = [];
    // 将某个对象送到rootArr中，去匹配它的父级或子级，如果没有匹配到则并列放到rootArr中
    // 定义三个数组 1idArr 2pIdArr 3refArr
    // 每一个元素开始判断时，都会先把它的id和pId存储到对应的数组里
    // 等关联好它的子父结构后，再将它的引用存储到refArr中
    var idArr = [];
    var pIdArr = [];
    var refArr = [];
    //debugger;
    while (newTotalArr.length > 0) {
        var tempObj = newTotalArr.shift();
        var id = tempObj.id;
        var pId = tempObj.pId;
        var hasParent = (idArr.indexOf(pId) != -1);
        var hasChildren = (pIdArr.indexOf(id) != -1);
        if (hasParent) {
            // 说明他有父节点
            var parent = refArr['id_' + pId];
            parent.additionalParameters.children.push(tempObj);
            parent.type = 'folder';
        }
        if (hasChildren) {
            // 说明他有子节点,循环遍历，
            tempObj.type = 'folder';
            for (var pIdKey in pIdArr) {
                if (pIdArr[pIdKey] == id) {
                    var child = refArr['id_' + idArr[pIdKey]];
                    tempObj.additionalParameters.children.push(child);
                    child.isNotRootObject = true;
                    // 将每个子节点关联到自己下面后将其pId从pIdArr中删除，可减少判断次数
                    delete pIdArr[pIdKey];
                }
            }
        }
        if (!hasParent) {
            rootArr.push(tempObj);
        }
        idArr.push(id);
        pIdArr.push(pId);
        refArr['id_' + id] = tempObj;
    }
    rootArr = rootArr.filter(function(item) {
        return !item.isNotRootObject;
    });
    return rootArr;
}