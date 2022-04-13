package com.mightyjava.service.impl;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Patient;
import com.mightyjava.repository.PatientRepository;

//import com.mightyjava.domain.Book;
 
//import com.mightyjava.repository.BookRepository;
 
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@Service
public class PatientServiceImpl implements IService<Patient>, IPageService<Patient> {

	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	public Collection<Patient> findAll() {
		return (Collection<Patient>) patientRepository.findAll();
	}

	@Override
	public Page<Patient> findAll(Pageable pageable, String searchText) {
		return patientRepository.findAllBooks(pageable, searchText);
	}
	
	// matching
	@Override
	public Page<Patient> findAll(Pageable pageable, String searchText, String searchText2, String searchText3) {
		return patientRepository.findAllBooks(pageable, searchText);
	}
	//

	// matching table 
	
//	public Page<Patient> matchAll(Pageable pageable,String searchText,String searchText5 ,String searchText4, String searchText3) {
//		return patientRepository.findAllBooks(pageable, searchText);
//	}	
	/////
	
	@Override
	public Page<Patient> findAll(Pageable pageable) {
		return patientRepository.findAll(pageable);
	}

	@Override
	public Optional<Patient> findById(Long donar_id) {
		return patientRepository.findById(donar_id);
	}

	@Override
	public Patient saveOrUpdate(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public String deleteById(Long donar_id) {
		JSONObject jsonObject = new JSONObject();
		try {
			patientRepository.deleteById(donar_id);
			jsonObject.put("message", "Patient deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

	 
	 
 

}
