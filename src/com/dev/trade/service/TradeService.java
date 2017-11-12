package com.dev.trade.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import com.dev.freamarker.pager.Pager;
import com.dev.trade.dao.TradeDao;

@Service
public class TradeService {

	@Resource TradeDao tradeDao;
	
	@Transactional
	public void insertTradeBase(Map<String, Object> dataMap,List<String> imgIds){
		String tradeId = UUID.randomUUID().toString();
		List<Map<String,String>> imgList = new ArrayList<Map<String, String>>();
		for (String imgid : imgIds) {
			Map<String,String> imgMap = new HashMap<String,String>();
			imgMap.put("id", UUID.randomUUID().toString());
			imgMap.put("imgid", imgid);
			imgMap.put("baseid", tradeId);
			imgList.add(imgMap);
		}
		tradeDao.insertTradeImgs(imgList);
		dataMap.put("id", tradeId);
		tradeDao.insertTradeBase(dataMap);
	}
	
	public List<Map<String, Object>> queryList(Pager p){
		return tradeDao.queryList(p);
	}
	
	public Map<String, Object> queryTradeDetail(String trade_id){
		Map<String, Object> detailMap = tradeDao.queryDetail(trade_id);
		List<Map<String, Object>> imageList = tradeDao.queryImages(trade_id);
		for (Map<String, Object> map : imageList) {
			byte[] bys = (byte[])map.get("content");
			String img_bs = Base64Utils.encodeToString(bys);
			map.put("bs64", img_bs);
		}
		detailMap.put("imgs", imageList);
		return detailMap;
	}
	
	public String queryImgBase64(String tradeFileId){
		
		Map<String, Object> tradeImgFileMap = tradeDao.queryImageById(tradeFileId);
		byte[] bys = (byte[])tradeImgFileMap.get("content");
		String img_bs = Base64Utils.encodeToString(bys);
		return img_bs;
	}
}
