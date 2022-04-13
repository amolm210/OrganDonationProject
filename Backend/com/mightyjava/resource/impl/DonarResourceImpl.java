package com.mightyjava.resource.impl;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Matching;
import com.mightyjava.repository.DonarRepository;
import com.mightyjava.resource.Resource;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@RestController
@RequestMapping("/donars")
@CrossOrigin(origins="http://localhost:3000")
public class DonarResourceImpl implements Resource<Donar> {
	
	@Autowired
	private DonarRepository donarRepository;
	
	@Autowired
	private IService<Donar> donarService;
	
	@Autowired
	private IPageService<Donar> donarPageService;

	// matching
	@Override
	public ResponseEntity<Page<Donar>> findAll(Pageable pageable, String blood, String city, String organ) {
		return new ResponseEntity<>(donarPageService.findAll(pageable, blood, city, organ), HttpStatus.OK);
	}
	//
	
	@Override
	public ResponseEntity<Page<Donar>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(donarPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Donar>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(donarPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Donar> findById(Long donar_id) {
		return new ResponseEntity<>(donarService.findById(donar_id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Donar> save(Donar donar) {
		donarRepository.deleteMatchingTableData();
//		donarRepository.insertMatchingTableData();
		 
		return new ResponseEntity<>(donarService.saveOrUpdate(donar), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Donar> update(Donar donar) {
		return new ResponseEntity<>(donarService.saveOrUpdate(donar), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long donar_id) {
		return new ResponseEntity<>(donarService.deleteById(donar_id), HttpStatus.OK);
	}

	 
	@GetMapping("/languages")
	public  ResponseEntity<Set<String>> findAllLanguages() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Jehangir Hospital-Pune", "Ashoka Hospital-Nashik", "Bombay Hospital-Mumbai", "Navdip Hospital-Aurangabad")), HttpStatus.OK);
    }

    @GetMapping("/genres")
    public  ResponseEntity<Set<String>> findAllGenres() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Male", "Female")), HttpStatus.OK);
    }
    
    // added on 1st april testing purpose 
    
    @GetMapping("/bgs")
	public  ResponseEntity<Set<String>> findAllBgs() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("A+", "O+", "B+","AB+", "A-", "O-", "B-", "AB-")), HttpStatus.OK);
    }

    @GetMapping("/organs")
    public  ResponseEntity<Set<String>> findAllOrgan() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Liver","Kidney","Lungs","Heart")), HttpStatus.OK);
    }

   
	 
     
	 
	 
    
    //
    
//    
//	@GetMapping("/centers")
//	public  ResponseEntity<Set<String>> findAllCenters() {
//        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Nashik", "Mumbai", "Pune", "Aurangabad", "Ahmednagar")), HttpStatus.OK);
//    }
//
//    @GetMapping("/genders")
//    public  ResponseEntity<Set<String>> findAllGenders() {
//        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Male", "Female")), HttpStatus.OK);
//    }
}
