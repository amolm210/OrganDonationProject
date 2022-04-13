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
import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Matching;
//import com.mightyjava.repository.BookRepository;
import com.mightyjava.repository.DonarRepository;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@Service
public class DonarServiceImpl implements IService<Donar>, IPageService<Donar> {

	@Autowired
	private DonarRepository donarRepository;
	
	@Override
	public Collection<Donar> findAll() {
		return (Collection<Donar>) donarRepository.findAll();
	}

	@Override
	public Page<Donar> findAll(Pageable pageable, String searchText) {
		return donarRepository.findAllBooks(pageable, searchText);
	}
	
	// matching
	@Override
	public Page<Donar> findAll(Pageable pageable, String blood, String city, String organ) {
		System.out.println("Data:");
		System.out.println(blood);
		System.out.println(city);
		System.out.println(organ);
		return donarRepository.findAllBooks(pageable, blood, city, organ);
	}
	//
	
	 

	@Override
	public Page<Donar> findAll(Pageable pageable) {
		return donarRepository.findAll(pageable);
	}

	@Override
	public Optional<Donar> findById(Long donar_id) {
		return donarRepository.findById(donar_id);
	}

	@Override
	public Donar saveOrUpdate(Donar donar) {
		return donarRepository.save(donar);
	}

	@Override
	public String deleteById(Long donar_id) {
		JSONObject jsonObject = new JSONObject();
		try {
			donarRepository.deleteById(donar_id);
			jsonObject.put("message", "Donar deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
