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
	
	/***
	 * 
	 * @param dataMap
	 * @param imgIds  文件ID
	 */
	public void updateTradeBase(Map<String, Object> dataMap,List<String> imgIds){
		List<Map<String, Object>> imageList = tradeDao.queryImages(dataMap.get("id").toString());
		List<String> deleteImgIds = new ArrayList<String>();
		for (Map<String, Object> imgMap : imageList) {
			String imgId = imgMap.get("fileid").toString();
			if(!imgIds.contains(imgId)){
				deleteImgIds.add(imgId);
			}else{
				imgIds.remove(imgId);
			}
		}
		
		//修改商品基础信息
		tradeDao.updateTrade(dataMap);
		
		List<Map<String,String>> imgList = new ArrayList<Map<String, String>>();
		String tradeId = dataMap.get("id").toString();
		//新增图片
		for (String imgid : imgIds) {
			Map<String,String> imgMap = new HashMap<String,String>();
			imgMap.put("id", UUID.randomUUID().toString());
			imgMap.put("imgid", imgid);
			imgMap.put("baseid", tradeId);
			imgList.add(imgMap);
		}
		tradeDao.insertTradeImgs(imgList);
		//数据库设置为级联删除，直接删除文件记录即可
		tradeDao.deleteImgs(deleteImgIds);
		
	}
	
	public void deleteTrade(String tradeId){
		List<Map<String,Object>> queryImages = tradeDao.queryImages(tradeId);
		List<String> imgIds = new ArrayList<String>();//文件Id
		for (Map<String, Object> map : queryImages) {
			imgIds.add(map.get("fileid").toString());
		}
		//商品和图片中间表做了级联删除设置
		if(!imgIds.isEmpty()){
			tradeDao.deleteImgs(imgIds);
		}
		tradeDao.deleteTrade(tradeId);
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
