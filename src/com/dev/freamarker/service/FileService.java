package com.dev.freamarker.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import com.dev.freamarker.dao.FileDao;

@Service
public class FileService {

	@Resource FileDao fileDao;
	
	public JSONObject uploadFile(MultipartFile file,String moduleid,String extend) throws IOException{
		JSONObject result = new JSONObject();
		InputStream is = file.getInputStream();
		ByteArrayOutputStream bAOutputStream = new ByteArrayOutputStream();
		String id = null;
		try{
			int ch;
			while ((ch = is.read()) != -1) {
				bAOutputStream.write(ch);
			}
			byte data[] = bAOutputStream.toByteArray();
			bAOutputStream.close();
			is.close();
			id = saveFileSteam(data, moduleid, extend);
			result.put("content", Base64Utils.encodeToString(data));
			result.put("id", id);
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(is != null){
				is.close();
			}
			if(bAOutputStream != null){
				bAOutputStream.close();
			}
		}
		return result;
	} 
	
	public String saveFileSteam(byte[] data,String moduleid,String extend){
		Map<String,Object> fileEntity = new HashMap<String,Object>();
		String id = UUID.randomUUID().toString();
		fileEntity.put("id", id);
		fileEntity.put("content", data);
		fileEntity.put("moduleid", moduleid);
		fileEntity.put("extend", extend);
		fileEntity.put("status", "1");
		fileDao.insertFile(fileEntity);
		return id;
	}
}
