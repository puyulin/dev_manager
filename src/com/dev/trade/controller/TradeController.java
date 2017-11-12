package com.dev.trade.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.dev.freamarker.controller.BaseController;
import com.dev.freamarker.pager.Pager;
import com.dev.freamarker.service.FileService;
import com.dev.trade.service.TradeService;
import com.dev.util.MultipartFileUtil;

@RequestMapping("/trade")
@Controller
public class TradeController extends BaseController{

	private String IMGPATH = "/upload/image/appmanager/img/";
	
	
	@Resource FileService fileService;
	
	@Resource TradeService tradeService;
	
	@RequestMapping("/gotoUpdate")
	public String gotoUpdate(){
		
		return "/trade/update";
	}
	
	@RequestMapping("/upImg")
    @ResponseBody
    public void upImg(@RequestParam final MultipartFile file) throws  IOException {
		String index = getParameter("index");
		JSONObject result = new JSONObject();
		final int max_size = 1024 * 1024 * 1;
		final String fileName = file.getOriginalFilename();
		final String suffix = fileName.substring(fileName.indexOf("."));
		final MultipartFileUtil multipartFileUtil = new MultipartFileUtil();
        final boolean file_validate = multipartFileUtil.fileSizeValidate(file, max_size);
        try{
        	if (!file_validate) {
                result.put("resultType", "ERROR");
                result.put("msg", "文件超出限制，建议上传不超过5M的图片!");
                throw new IOException("filesize is too large");
            }
        	if (fileName != null && (".jpg".equals(suffix) || ".png".equals(suffix) || ".gif".equals(suffix)
                    || ".jpeg".equals(suffix))) {
                // 处理图片
        		String imgid = null;
        		if(index.equals("5")){
        			imgid = fileService.uploadFile(file, "trade_content", null);
        		}else{
        			imgid = fileService.uploadFile(file, "trade_head", null);
        		}
                result.put("resultType", "SUCCESS");
                result.put("imgid", imgid);
                // result.put("path", IMGPATH+imgname);
            } else {
                result.put("resultType", "ERROR");
                result.put("msg", "文件格式不正确");// 文件格式不支持
                throw new IOException("fileType must cast with jpg,png,gif,jpeg");
            }
        	responseWithJsonString(getResponse(), result);
        }catch(Exception e){
        	e.printStackTrace();
        }
	} 
	
	@RequestMapping("/save")
	@ResponseBody
	public Map<String, Object> save(){
		String name = getParameter("name");//名称
		String code = getParameter("code");//编号
		String brand = getParameter("brand");//品牌
		String price = getParameter("price");//价格
		String MS = getParameter("MS");//材质
		String msize = getParameter("msize");//尺寸
		String wxcode = getParameter("wxcode");//微信号
		String email = getParameter("email");//邮箱
		String img1 = getParameter("trade_imgpath_1");
		String img2 = getParameter("trade_imgpath_2");
		String img3 = getParameter("trade_imgpath_3");
		String img4 = getParameter("trade_imgpath_4");
		String img5 = getParameter("trade_imgpath_5");
		Map<String,Object> dataMap = new HashMap<String,Object>();
		List<String> imgids = new ArrayList<String>();
		if(StringUtils.isNotBlank(img1)){
			imgids.add(img1);
		}
		if(StringUtils.isNotBlank(img2)){
			imgids.add(img2);
		}
		if(StringUtils.isNotBlank(img3)){
			imgids.add(img3);
		}
		if(StringUtils.isNotBlank(img4)){
			imgids.add(img4);
		}
		if(StringUtils.isNotBlank(img5)){
			imgids.add(img5);
		}
		dataMap.put("name", name);
		dataMap.put("code", code);
		dataMap.put("brand", brand);
		dataMap.put("price", price);
		dataMap.put("ms", MS);
		dataMap.put("msize", msize);
		dataMap.put("wxcode", wxcode);
		dataMap.put("email", email);
		tradeService.insertTradeBase(dataMap,imgids);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put(IS_SUCCESS, true);
		return result;
	}
	
	
	@RequestMapping("/list")
	public String list(){
		
		return "/trade/list";
	}
	
	@RequestMapping("/searchList")
	@ResponseBody
	public Pager<Map<String, Object>> searchList(Pager<Map<String, Object>> p){
		Map<String,String> conditionMap = new HashMap<String,String>();
		p.setQueryObject(conditionMap);
		List<Map<String, Object>> resultList = tradeService.queryList(p);
		p.setData(resultList);
		return p;
	}
	
	@RequestMapping("/showTradeInfo")
	public String showTradeInfo(){
		Map<String, Object> detailMap = tradeService.queryTradeDetail(getParameter("tradeId"));
		setAttribuate("detailMap", detailMap);
		String[] msizeArray = StringUtils.split(detailMap.get("msize").toString(), ",");
		List<String> asList = Arrays.asList(msizeArray);
		setAttribuate("asList", asList);
		return "/trade/trade_module_1";
	}
}
