package com.mightyjava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// import com.mightyjava.domain.Book;
 
import com.mightyjava.domain.Patient;

@Repository
public interface PatientRepository extends PagingAndSortingRepository<Patient, Long> {

    @Query("FROM Patient b WHERE b.name LIKE %:searchText% OR b.city LIKE %:searchText% OR b.language LIKE %:searchText% OR b.genre LIKE %:searchText% OR b.organ LIKE %:searchText% OR b.bg LIKE %:searchText% ORDER BY b.email ASC")
    Page<Patient> findAllBooks(Pageable pageable, @Param("searchText") String searchText);
    
//    //
//    @Query("FROM Patient b WHERE b.name LIKE %:searchText% OR b.city LIKE %:searchText% OR b.language LIKE %:searchText% OR b.genre LIKE %:searchText% ORDER BY b.age ASC")
//    Page<Patient> find(Pageable pageable, @Param("searchText") String searchText);
//    //
}
