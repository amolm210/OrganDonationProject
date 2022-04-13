//package com.mightyjava.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.mightyjava.domain.Patient;
//
//@Repository
//public interface PatientRepository2 extends JpaRepository<Patient, Long> {
//
//    //
//    @Query("FROM Patient b WHERE b.name LIKE %:searchText% OR b.city LIKE %:searchText% OR b.language LIKE %:searchText% OR b.genre LIKE %:searchText% ORDER BY b.age ASC")
//	static
//    Patient findme(@Param("searchText") String searchText) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//    //
////    
////    @Query("FROM User WHERE email=:email")
////	User findByEmail(@Param("email") String email);
//}
//
