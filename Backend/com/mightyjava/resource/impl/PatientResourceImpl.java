package com.mightyjava.resource.impl;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;
//
//import org.codehaus.jettison.json.JSONException;
//import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 
import com.mightyjava.domain.Patient;
//import com.mightyjava.domain.User;
//import com.mightyjava.repository.PatientRepository2;
import com.mightyjava.resource.PatientsResource;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins="http://localhost:3000")
public class PatientResourceImpl implements PatientsResource<Patient> {
	
	@Autowired
	private IService<Patient> patientService;
	
	@Autowired
	private IPageService<Patient> patientPageService;

	@Override
	public ResponseEntity<Page<Patient>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(patientPageService.findAll(pageable, searchText), HttpStatus.OK);
	}
	
	/**/
//	@PostMapping(value = "/findme", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<String> findme(@RequestBody User user) {
//		JSONObject jsonObject = new JSONObject();
//		try {
//			jsonObject.put("name", PatientRepository2.findme(user.getName()));
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
		
////		try {
////			Authentication authentication = authenticationManager
////					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
////			if (authentication.isAuthenticated()) {
////				String email = user.getEmail();
////				jsonObject.put("name", authentication.getName());
////				jsonObject.put("authorities", authentication.getAuthorities());
////				jsonObject.put("token", tokenProvider.createToken(email, userRepository.findByEmail(email).getRole()));
////				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
////			}
////		} catch (JSONException e) {
////			try {
////				jsonObject.put("exception", e.getMessage());
////			} catch (JSONException e1) {
////				e1.printStackTrace();
////			}
////			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
////		}
////		return null;
//	}
//	/*public ResponseEntity<Page<Patient>> findAll(Pageable pageable, String searchText) {
//	 	return new ResponseEntity<>(patientPageService.findAll(pageable, searchText), HttpStatus.OK);
//	}*/
	 
/**/
	@Override
	public ResponseEntity<Page<Patient>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(patientPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Patient> findById(Long donar_id) {
		return new ResponseEntity<>(patientService.findById(donar_id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Patient> save(Patient patient) {
		return new ResponseEntity<>(patientService.saveOrUpdate(patient), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Patient> update(Patient patient) {
		return new ResponseEntity<>(patientService.saveOrUpdate(patient), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long donar_id) {
		return new ResponseEntity<>(patientService.deleteById(donar_id), HttpStatus.OK);
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
