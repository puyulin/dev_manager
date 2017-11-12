package com.dev.freamarker.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface FileDao {

	public String insertFile(Map<String, Object> fileEntity);
}
