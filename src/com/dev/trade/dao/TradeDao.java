package com.dev.trade.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.dev.freamarker.pager.Pager;

@Repository
public interface TradeDao {

	public void insertTradeBase(Map<String, Object> dataMap);
	
	public void insertTradeImgs(List<Map<String, String>> imgList);
	
	public List<Map<String, Object>> queryList(Pager p);
	
	public Map<String, Object> queryDetail(String trade_id);
	
	public List<Map<String, Object>> queryImages(String trade_id);
	
}
