package com.mightyjava.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Matching;

public interface IPageService<T> {
	Page<T> findAll(Pageable pageable, String searchText);

	Page<T> findAll(Pageable pageable);
//	
 	Page<T> findAll(Pageable pageable, String blood, String city, String organ);
//
	
	 
	 
  
//	Page<Donar> findAll(String blood, String city, String organ);
	 
//
	
}
