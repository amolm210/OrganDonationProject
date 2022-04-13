package com.mightyjava.resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Matching;

public interface Resource<T> {
	@GetMapping("/search/{searchText}")
	ResponseEntity<Page<T>> findAll(Pageable pageable, @PathVariable String searchText);

	@GetMapping
	ResponseEntity<Page<T>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir);
	
	@GetMapping("{donar_id}")
	ResponseEntity<T> findById(@PathVariable Long donar_id);
	
//	@GetMapping("{id}")
//	ResponseEntity<T> findById(@PathVariable Long id);
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<T> save(@RequestBody T t);
	
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<T> update(@RequestBody T t);
	
	@DeleteMapping("{donar_id}")
	ResponseEntity<String> deleteById(@PathVariable Long donar_id);
	
	 

	//
	@GetMapping("/search/{blood}/{city}/{organ}")
	ResponseEntity<Page<Donar>> findAll(Pageable pageable, @PathVariable String blood, @PathVariable String city, @PathVariable String organ);
	
	///added for matching 
	
	
	
	 
	
//	@PostMapping("/fdonar")
//	ResponseEntity<Page<Matching>> matchAll(Pageable pageable, @PathVariable String blood, @PathVariable String city, @PathVariable String organ);
//	
 
	 
//	@DeleteMapping("{id}")
//	ResponseEntity<String> deleteById(@PathVariable Long id);
	
	
	
	
	
}
