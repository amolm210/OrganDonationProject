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
import com.mightyjava.domain.Matching;
import com.mightyjava.domain.Patient;
import com.mightyjava.domain.Matching;
//import com.mightyjava.repository.BookRepository;
import com.mightyjava.repository.MatchingRepository;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@Service
public class MatchingServiceImpl implements IService<Matching>, IPageService<Matching> {

	@Autowired
	private MatchingRepository matchingRepository;
	
	@Override
	public Collection<Matching> findAll() {
		return (Collection<Matching>) matchingRepository.findAll();
	}

	@Override
	public Page<Matching> findAll(Pageable pageable, String searchText) {
		return matchingRepository.findAllBooks(pageable, searchText);
	}
	
	// matching
//	@Override
//	public Page<Matching> findAll(Pageable pageable, String blood, String city, String organ) {
//		System.out.println("Data:");
//		System.out.println(blood);
//		System.out.println(city);
//		System.out.println(organ);
//		return matchingRepository.findAllBooks(pageable, blood, city, organ);
//	}
	//
	
	//
	@Override
	public Page<Matching> findAll(Pageable pageable, String searchText, String searchText2, String searchText3) {
		return matchingRepository.findAllBooks(pageable, searchText);
	}
	//

	@Override
	public Page<Matching> findAll(Pageable pageable) {
		return matchingRepository.findAll(pageable);
	}

	@Override
	public Optional<Matching> findById(Long matching_id) {
		return matchingRepository.findById(matching_id);
	}

	@Override
	public Matching saveOrUpdate(Matching matching) {
		return matchingRepository.save(matching);
	}

	@Override
	public String deleteById(Long matching_id) {
		JSONObject jsonObject = new JSONObject();
		try {
			matchingRepository.deleteById(matching_id);
			jsonObject.put("message", "Matching deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
