package com.store.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	public String uploadFiles(MultipartFile file , String path) throws IOException;
	InputStream getResource(String path , String name) throws FileNotFoundException;
}
