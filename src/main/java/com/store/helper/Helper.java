package com.store.helper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

import com.store.dto.PageableResponse;


public class Helper {
	// we need to convert page response of U into page response of V type
	public static <U,V> PageableResponse<V> getpageableResponse(Page<U> page , Class<V> type){
		List<U> enitiy = page.getContent();
		
		List<V> convertedIntoV = enitiy.stream().map(object -> new ModelMapper().map(object, type)).collect(Collectors.toList());
		
		PageableResponse<V> resp = new PageableResponse<>() ;
		resp.setContent(convertedIntoV);
		resp.setLastPage(page.isLast());
		resp.setPageNumber(page.getNumber());
		resp.setPageSize(page.getSize());
		resp.setTotalElement(page.getTotalElements());
		resp.setTotalPages(page.getTotalPages());
		return resp;
		
	}
	
	
	
}
