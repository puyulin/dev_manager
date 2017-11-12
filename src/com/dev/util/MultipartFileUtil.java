package com.dev.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletResponse;

import net.sf.jmimemagic.Magic;
import net.sf.jmimemagic.MagicMatch;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Component
public class MultipartFileUtil{
	private  Logger logger = LoggerFactory.getLogger(this.getClass());
	private final static String SYS_SPRTR = File.separator;
	public final static String FILE_TP_HTML= "text/html";
	public final static String FILE_TP_XML="text/xml";
	public final static String FILE_TP_XHTML="application/xhtml+xml";
	public final static String FILE_TP_TEXT="text/plain";
	public final static String FILE_TP_RTF="application/rtf";
	public final static String FILE_TP_PDF="application/pdf";
	public final static String FILE_TP_MSDOC="application/msword";
	public final static String FILE_TP_MSDOCX="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
	public final static String FILE_TP_MSXLS="application/vnd.ms-excel";
	public final static String FILE_TP_MSXLSX="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	public final static String FILE_TP_MSPPT="application/vnd.ms-powerpoint";
	public final static String FILE_TP_MSPPTX="application/vnd.openxmlformats-officedocument.presentationml.presentation";
	public final static String FILE_TP_PNG="image/png";
	public final static String FILE_TP_GIF="image/gif";
	public final static String FILE_TP_JPEG="image/jpeg";
	public final static String FILE_TP_GZIP="application/x-gzip";
	public final static String FILE_TP_ZIP="application/zip";//You have to include this if include docx,pptx,xlsx in your check list
	public final static String FILE_TP_TAR="application/x-tar";
	public final static String FILE_TP_BINARY="application/octet-stream";
	public final static String FILE_TP_DBK="application/octet-stream";//"application/docbook+xml";
	public final static String FILE_TP_ICO="image/x-icon";
	public final static String FILE_TP_BMP="image/bmp";
	
	/**
	 * 验证文件类型
	 * @param file 目标文件
	 * @param fileType 文件类型
	 * @return true 符合类型要求
	 */
	public boolean fileTypeValidate(MultipartFile file,String[] fileType){
		boolean flag = false;
		if(file != null && !file.isEmpty() && fileType !=null && fileType.length > 0){
			for (int i = 0; i < fileType.length; i++) {
				flag = fileTypeValidate(file,fileType[i]);
				if(flag){
					break;
				}
			}
		}
		return flag;
	}
	/**
	 * 验证文件类型
	 * @param file 目标文件
	 * @param fileType 文件类型
	 * @return true 符合类型要求
	 */
	public boolean fileTypeValidate(MultipartFile file,String fileType){
		boolean flag = false;
		if(file != null && !file.isEmpty() && fileType !=null && fileType.trim() != ""){
			if(fileType.equals(file.getContentType())){
				flag = true;
			}
		}
		return flag;
	}
	/**
	 * 验证文件大小
	 * @param file 目标文件
	 * @param maxSize 允许的最大字节数
	 * @param minSize 允许的最小字节数
	 * @return true 符合大小要求
	 * @throws RuntimeException
	 */
	public boolean fileSizeValidate(MultipartFile file,long minSize,long maxSize) throws RuntimeException{
		boolean flag = false;
		try {
			if(file != null && !file.isEmpty()){
				if((file.getSize() <= maxSize) && (file.getSize() >=minSize)){
					flag = true;
				}
			}
		} catch (Exception e) {
			logger.error("MultipartFileUploadUtil.fileSizeValidate", e);
			throw new RuntimeException(e.getMessage());
		}
		return flag;
	}
	/**
	 * 验证文件大小
	 * @param file 目标文件
	 * @param maxSize 允许的最大字节数
	 * @return true 符合大小要求
	 * @throws RuntimeException
	 */
	public boolean fileSizeValidate(MultipartFile file,long maxSize) throws RuntimeException{
		return fileSizeValidate(file,0,maxSize);
	}
	/**
	 * 上传指定文件，当文件名冲突时自动重命名.重命名规则:文件名后加"_1","_2"...
	 * @param file 目标文件
	 * @param webRootPath  WEB项目根目录
	 * @param relativePath	目标文件存储的相对路径，不包含文件名
	 * @return String 目标文件的相对路径(含文件名),"-1"为存储失败
	 * @throws RuntimeException
	 */
	public String uploadFileReNmIfExist(MultipartFile file,String webRootPath,String relativePath) throws RuntimeException{
		return uploadFileReNmIfExist(file,webRootPath,relativePath,file.getName());
	}
	/**
	 * 上传指定文件，当文件名冲突时自动重命名.重命名规则:文件名后加"_1","_2"...
	 * @param file 目标文件
	 * @param webRootPath  WEB项目根目录
	 * @param relativePath	目标文件存储的相对路径，不包含文件名
	 * @param fileNm 自定义文件名(无后缀)
	 * @return String 目标文件的相对路径(含文件名),"-1"为存储失败
	 * @throws RuntimeException
	 */
	public String uploadFileReNmIfExist(MultipartFile file,String webRootPath,String relativePath,String fileNm) throws RuntimeException{
		return uploadFileReNmIfExist(file,webRootPath,relativePath,fileNm,0);
	}
	private String uploadFileReNmIfExist(MultipartFile file,String webRootPath,String relativePath,String fileNm,int index) throws RuntimeException{
		String filePath = "-1";
		if(!file.isEmpty()){
			try {
				if("\\".equals(SYS_SPRTR) && relativePath.startsWith("\\\\")){
					relativePath = relativePath.replaceFirst("\\\\", "");
				} else if("/".equals(SYS_SPRTR) && relativePath.startsWith("/")){
					relativePath = relativePath.replaceFirst("/", "");
				}
				String fileSuffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
				String fileDirct =webRootPath + relativePath
						+ fileNm + (index == 0?"":"_"+index) + fileSuffix;
				File targetDirct = new File(fileDirct);
				if(targetDirct.exists()){
					filePath = uploadFileReNmIfExist(file,webRootPath,relativePath,fileNm,++index);
				} else {
					file.transferTo(targetDirct);
					filePath = SYS_SPRTR+relativePath+ fileNm + (index == 0?"":"_"+index) + fileSuffix;
					if("\\".equals(SYS_SPRTR)){
						filePath = filePath.replaceAll("\\\\", "/");
					}
				}
			} catch (Exception e) {
				logger.error("MultipartFileUploadUtil.uploadFileReNmIfExist", e);
				throw new RuntimeException(e.getMessage());
			}
		}
		return filePath;
	}
	/**
	 * 上传指定文件
	 * @param file 目标文件
	 * @param webRootPath  WEB项目根目录
	 * @param relativePath	目标文件存储的相对路径,不包含文件名
	 * @return boolean true:成功,false:失败
	 * @throws RuntimeException
	 */
	public boolean uploadFile(MultipartFile file,String webRootPath,String relativePath) throws RuntimeException{
		boolean flag = false;
		if(!file.isEmpty()){
			try {
				if("\\".equals(SYS_SPRTR) && relativePath.startsWith("\\\\")){
					relativePath = relativePath.replaceFirst("\\\\", "");
				} else if("/".equals(SYS_SPRTR) && relativePath.startsWith("/")){
					relativePath = relativePath.replaceFirst("/", "");
				}
				String fileDirct =webRootPath + relativePath
						+ file.getOriginalFilename();
				File targetDirct = new File(fileDirct);
				if(targetDirct.exists()){
					return false;
				} else {
					file.transferTo(targetDirct);
					flag = true;
				}
			} catch (Exception e) {
				logger.error("MultipartFileUploadUtil.uploadFile", e);
				throw new RuntimeException(e.getMessage());
			}
		}
		return flag;
	}
	/**
	 * 上传指定文件
	 * @param file 目标文件
	 * @param fileDirct	目标文件存储的绝对路径,不包含文件名
	 * @return boolean true:成功,false:失败
	 * @throws RuntimeException
	 */
	public boolean uploadFile(MultipartFile file,String fileDirct) throws RuntimeException{
		boolean flag = false;
		if(!file.isEmpty()){
			try {
				String filePath =fileDirct
						+ file.getOriginalFilename();
				File targetDirct = new File(filePath);
				if(targetDirct.exists()){
					return false;
				} else {
					file.transferTo(targetDirct);
					flag = true;
				}
			} catch (Exception e) {
				logger.error("MultipartFileUploadUtil.uploadFile", e);
				throw new RuntimeException(e.getMessage());
			}
		}
		return flag;
	}
	/**
	 * 删除指定文件
	 * @param webRootPath WEB项目根目录
	 * @param filePath 目标文件存储的相对路径,包含文件名
	 * @return true 当删除成功或者指定文件不存在时
	 * @throws RuntimeException
	 */
	public boolean deleteFile(String webRootPath,String filePath) throws RuntimeException{
		boolean flag = false;
		try {
			if("\\".equals(SYS_SPRTR) && filePath.startsWith("\\\\")){
				filePath = filePath.replaceFirst("\\\\", "");
			} else if("/".equals(SYS_SPRTR) && filePath.startsWith("/")){
				filePath = filePath.replaceFirst("/", "");
			}
			flag = deleteFile(webRootPath+filePath);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		return flag;
	}
	/**
	 * 删除指定文件
	 * @param filePath 目标文件存储的绝对路径,包含文件名
	 * @return true 当删除成功或者指定文件不存在时
	 * @throws RuntimeException
	 */
	public boolean deleteFile(String filePath) throws RuntimeException{
		boolean flag = false;
		try {
			File file = new File(filePath);
			if(!file.exists()){
				return true;
			} else {
				flag = file.delete();
			}
		} catch (Exception e) {
			logger.error("MultipartFileUploadUtil.deleteFileIfExists", e);
			throw new RuntimeException(e.getMessage());
		}
		return flag;
	}
	
	/**
	 * 下载指定文件到前台页面（采用二进制传输）
	 * @param response HttpServletResponse 对象
	 * @param file 目标文件
	 * @return true or false
	 * @throws RuntimeException
	 */
	public boolean downloadFile(HttpServletResponse response,File file) throws RuntimeException{
		return downloadFile(response,file,"application/octet-stream");
	}
	/**
	 * 下载指定文件到前台页面（采用非二进制传输，请自行设置content-type）
	 * @param response HttpServletResponse 对象
	 * @param file 目标文件
	 * @param responseContentTp 响应头类型
	 * @return true or false
	 * @throws RuntimeException
	 */
	public boolean downloadFile(HttpServletResponse response,File file,String responseContentTp) throws RuntimeException{//
		boolean flag = false;
		FileInputStream fileInputStream = null;
		BufferedInputStream bufferedInputStream = null;
		OutputStream outputStream = null;
		if(file == null || !file.isFile()){
			return flag;
		}
		try {
			response.reset();
			response.setHeader("Content-Type", responseContentTp);
			response.setHeader("Content-Disposition", "attachment;filename="+
					URLEncoder.encode(file.getName(), "UTF-8"));
			response.setHeader("Content-Length", "" + file.length());
			outputStream = response.getOutputStream();
			fileInputStream = new FileInputStream(file);
			bufferedInputStream = new BufferedInputStream(fileInputStream);
		    byte[] contents = new byte[1024*1024*2];  
		    int bytesNum = 0;
		    while((bytesNum = bufferedInputStream.read(contents)) !=-1){
		    	outputStream.write(contents, 0, bytesNum);
		    }
		    outputStream.flush();
		    flag = true;
		} catch (Exception e) {
			logger.error("MultipartFileUploadUtil.deleteFileIfExists", e);
			flag = false;
			throw new RuntimeException(e.getMessage());
		} finally {
			try {
				if(bufferedInputStream != null){
					bufferedInputStream.close();
				}
				if(fileInputStream != null){
					fileInputStream.close();
				}
				if(outputStream != null){
					outputStream.close();
				}
			} catch (Exception ex) {
				logger.error("MultipartFileUploadUtil.deleteFileIfExists", ex);
			}
		}
	    return flag;
	}
	
	/**
	 * 兼容$.ajaxFileUpload 的回调函数,调用此方法的控制器不用设置返回值
	 * @param response HttpServletResponse 对象
	 * @param responseObject 推荐使用HashMap<String,String>
	 * @throws RuntimeException
	 */
	public void responseWithJsonString(HttpServletResponse response,  
	        Object responseObject) throws RuntimeException{  
	    JSONObject responseJSONObject = JSONObject.fromObject(responseObject);  
	    response.setCharacterEncoding("UTF-8");  
	    response.setContentType("text/html; charset=utf-8");  
	    PrintWriter out = null;  
	    try {  
	        out = response.getWriter();  
	        out.append(responseJSONObject.toString());
	    } catch (IOException e) {  
	    	throw new RuntimeException(e.getMessage());
	    } finally {  
	        if (out != null) {  
	            out.close();  
	        }  
	    }  
	}
	
	/**
	 * 分析文件的真实类型
	 * @method getJmimemagicType
	 * @param file
	 * @return
	 */
	public String getJmimemagicType(File file){
		String mimeType = null;
        try {
            Path path = Paths.get(file.getAbsolutePath());
            byte[] data = Files.readAllBytes(path);
            MagicMatch match = Magic.getMagicMatch(data);
            
            mimeType = match.getMimeType();
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return mimeType;
	}
	
	/**
	 * 私有方法：此方法以前的所有检测只根据后缀名和MINETYPE来判断文件类型.文件上传完成后需要根据文件内容再次猜测文件类型,避免恶意攻击.
	 * @param rootPath
	 * @param imgPath
	 * @param fileTps
	 * @return
	 * @throws RuntimeException
	 */
	public boolean guessRealFileType(String rootPath,String imgPath,String[] fileTps) throws RuntimeException{
		boolean result = false;
		if(imgPath.startsWith(File.separator)){
			imgPath = imgPath.substring(1);
		}
		try {
			String guessTp = getJmimemagicType(new File(rootPath+imgPath));
			for (int i = 0; i < fileTps.length; i++) {
				logger.info("File(" + rootPath+imgPath +" "+guessTp+") check type: " + fileTps[i]);
				if(fileTps[i].equals(guessTp)){
					result = true;
					break;
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			deleteFile(rootPath, imgPath);
			return false;
		}
		return result;
	}
	/**
	 * 分析文件的真实类型
	 * @method getJmimemagicType
	 * @param file
	 * @return
	 */
	public String getJmimemagicType(MultipartFile file){
		String mimeType = null;
        try {
            byte[] data = file.getBytes();
            MagicMatch match = Magic.getMagicMatch(data);
            
            mimeType = match.getMimeType();
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return mimeType;
	}
	/**
	 * 此方法以前的所有检测只根据后缀名和MINETYPE来判断文件类型.文件上传完成后需要根据文件内容再次猜测文件类型,避免恶意攻击.
	 * @param file (MultipartFile)
	 * @param fileTps (文件类型白名单)
	 * @return
	 * @throws RuntimeException
	 */
	public boolean guessRealFileType(MultipartFile file,String[] fileTps) throws RuntimeException{
		boolean result = false;
		try {
			String guessTp = getJmimemagicType(file);
			for (int i = 0; i < fileTps.length; i++) {
				logger.info("File(" + file.getOriginalFilename() +" "+guessTp+") check type: " + fileTps[i]);
				if(fileTps[i].equals(guessTp)){
					result = true;
					break;
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return result;
	}
}
