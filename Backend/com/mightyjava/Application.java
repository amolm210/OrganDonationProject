package com.mightyjava;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.ComponentScan;
// import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import com.mightyjava.domain.Book;
import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Patient;
import com.mightyjava.domain.Role;
import com.mightyjava.domain.User;
import com.mightyjava.service.IRoleService;
import com.mightyjava.service.IService;
import com.mightyjava.utils.ConstantUtils;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;
	
	 
//	@Autowired
//	private IService<Book> bookService;
//	
	//added for donar
	@Autowired
	private IService<Donar> donarService;
	
//	//added for patient
	@Autowired
	private IService<Patient> patientService;
		
	

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}

		if (userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setName("Test User");
			user1.setMobile("9787456545");
			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Test Admin");
			user2.setMobile("9787456545");
			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userService.saveOrUpdate(user2);
		}

 
		
		if (donarService.findAll().isEmpty()) {
			for (int i = 1; i <= 5 ; i++) {
				Donar donar = new Donar();
				donar.setName("Harshal" + i);
				donar.setCity("Nashik" + i);
				donar.setDob("02/11/1996");
				donar.setMobile(9898989898l);
				donar.setEmail("test@donar.com");
				donar.setLanguage("Nashik");
				donar.setGenre("Male");
				//
				donar.setBg("A+");
				donar.setOrgan("Heart");
				//
				donarService.saveOrUpdate(donar);
			}
		}
		
		
 		if (patientService.findAll().isEmpty()) {
 			for (int i = 1; i <= 5 ; i++) {
 				Patient patient = new Patient();
 				patient.setName("Harshal" + i);
 				patient.setCity("Nashik" + i);
 				patient.setDob("02/11/1996");
 				patient.setMobile(9898989898l);
 				patient.setEmail("patient@yahoo.com");
 				patient.setLanguage("Nashik");
 				patient.setGenre("Male");
 				//
 				patient.setBg("A+");
				patient.setOrgan("Heart");
 				//
				patientService.saveOrUpdate(patient);
				
				
 			}
 		}
 		
		
	}

}