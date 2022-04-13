package com.mightyjava.service.impl;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

//import com.mightyjava.domain.Book;
import com.mightyjava.domain.Center;
import com.mightyjava.domain.Center;
//import com.mightyjava.repository.BookRepository;
import com.mightyjava.repository.CenterRepository;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@Service
public class CenterServiceImpl implements IService<Center>, IPageService<Center> {

	@Autowired
	private CenterRepository centerRepository;
	
	@Override
	public Collection<Center> findAll() {
		return (Collection<Center>) centerRepository.findAll();
	}

	@Override
	public Page<Center> findAll(Pageable pageable, String searchText) {
		return centerRepository.findAllBooks(pageable, searchText);
	}
	
	
	@Override
	public Page<Center> findAll(Pageable pageable, String searchText, String searchText2, String searchText3) {
		return centerRepository.findAllBooks(pageable, searchText);
	}
	
	// center
//	@Override
//	public Page<Center> findAll(Pageable pageable, String blood, String city, String organ) {
//		System.out.println("Data:");
//		System.out.println(blood);
//		System.out.println(city);
//		System.out.println(organ);
//		return centerRepository.findAllBooks(pageable, blood, city, organ);
//	}
	//
	
	 

	@Override
	public Page<Center> findAll(Pageable pageable) {
		return centerRepository.findAll(pageable);
	}

	@Override
	public Optional<Center> findById(Long center_id) {
		return centerRepository.findById(center_id);
	}

	@Override
	public Center saveOrUpdate(Center center) {
		return centerRepository.save(center);
	}

	@Override
	public String deleteById(Long center_id) {
		JSONObject jsonObject = new JSONObject();
		try {
			centerRepository.deleteById(center_id);
			jsonObject.put("message", "Center deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
