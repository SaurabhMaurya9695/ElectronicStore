package com.store.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.store.exceptions.BadApiRequestException;
import com.store.service.FileService;

@Service
public class FileServiceImpl implements FileService {

	private Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);
	
	@Override
	public String uploadFiles(MultipartFile file, String path) throws IOException {
		
		// we can upload many file name with same no so avoid this conflict we have to put random name at the end of
		// every file name ;
		
		String originamFileName = file.getOriginalFilename(); // abc.png
		String filename = UUID.randomUUID().toString(); // generated random Id ;
		String ext = originamFileName.substring(originamFileName.lastIndexOf("."));
		String fileNameWithExtension = filename + ext ;
		logger.info("Original File Name is : {} , FileNameWithEx is {} " , originamFileName , fileNameWithExtension);
		String fullPathNameWithFileExtension = path  + fileNameWithExtension;
		
		
		if(ext.equalsIgnoreCase(".jpg") || ext.equalsIgnoreCase(".jpeg") || ext.equalsIgnoreCase(".png")) {
			//Now we can save file on this path ;
			// if folder is not there then first create folder then put file in this path
			
			File folder = new File(path);
			if(! folder.exists() ) {
				folder.mkdirs();
			}
			//then  you can save file at this path ;
			
			Files.copy(file.getInputStream(), Paths.get(fullPathNameWithFileExtension) ) ; // it will give exception
			return fullPathNameWithFileExtension;
		}
		else {
			throw new BadApiRequestException("File With This " + ext + " Extension Not Allowed!!..");
		}
	}

	@Override
	public InputStream getResource(String path, String name) throws FileNotFoundException {
		
		String fullpath = path  + name ;
		logger.info("Full path is : {} ",fullpath);
		InputStream inputStream = new FileInputStream(fullpath);
		return inputStream;
	}

}









