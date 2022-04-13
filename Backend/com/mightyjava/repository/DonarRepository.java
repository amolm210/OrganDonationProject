package com.mightyjava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

// import com.mightyjava.domain.Book;
import com.mightyjava.domain.Donar;
import com.mightyjava.domain.Matching;

@Repository
public interface DonarRepository extends PagingAndSortingRepository<Donar, Long> {

    @Query("FROM Donar b WHERE b.name LIKE %:searchText% OR b.city LIKE %:searchText% OR b.language LIKE %:searchText% OR b.organ LIKE %:searchText% OR b.bg LIKE %:searchText% ORDER BY b.email ASC")
    Page<Donar> findAllBooks(Pageable pageable, @Param("searchText") String searchText);
    
    @Query("FROM Donar b WHERE b.bg LIKE %:blood% AND b.city LIKE %:city% AND b.organ LIKE %:organ% ORDER BY b.email ASC")
    Page<Donar> findAllBooks(Pageable pageable, @Param("blood") String blood, @Param("city") String city, @Param("organ") String organ);

    @Modifying
    @Transactional
    @Query(value=" INSERT INTO matching (pname, dname, porgan, pbg, pcity, pcenter, dcity, dcenter) SELECT patient.name, donar.name, patient.organ, donar.bg, patient.city, patient.center, donar.city, donar.center  FROM patient JOIN donar ON patient.bg=donar.bg AND patient.organ=donar.organ",nativeQuery = true)
    void insertMatchingTableData();
    
    @Modifying
    @Transactional
    @Query(value="Delete from matching",nativeQuery= true)
    void deleteMatchingTableData();
    
    //INSERT INTO test (pname, dname, porgan, pbg, pcity, pcenter, dcity, dcenter) SELECT patient.name, donar.name, patient.organ, donar.bg, patient.city, patient.center, donar.city, donar.center  FROM patient JOIN donar ON patient.bg=donar.bg AND patient.organ=donar.organ;
    
//    @Query(value = "UPDATE matching_table m SET donar_organ =:organ, donar_bg =:blood WHERE m.patient_organ=:organ", nativeQuery = true)
//    Page<Matching> findAllBooks(Pageable pageable, @Param("blood") String blood, @Param("city") String city, @Param("organ") String organ);

    
    
//    @Query(value = "UPDATE matching_table m SET donar_organ =:organ, donar_bg =:blood WHERE m.patient_organ=:organ", nativeQuery = true)
//    Page<Donar> findAllBooks( Pageable pageable,@Param("blood") String blood, @Param("city") String city, @Param("organ") String organ);
//    
//    
    
//    @Query(value = "UPDATE matching_table SET donar_organ = organ, donar_bg = blood WHERE patient_organ=organ", nativeQuery = true)
//    Page<Donar> matchAllPairs(Pageable pageable, @Param("bg") String bg, @Param("city") String city, @Param("organ") String organ);
//         
//
//UPDATE matching_table SET donar_organ = organ, donar_bg = blood WHERE patient_organ=organ;
//UPDATE matching_table SET donar_organ = "Liver", donar_bg = "B+" WHERE patient_organ="Liver";    
    
    
    
//stack overflow part
    
 //   @Query(value = "UPDATE Users u set EMAIL_VERIFICATION_STATUS =:emailVerificationStatus where u.USER_ID = :userId",
   //         nativeQuery = true)
    
}
