package com.mightyjava.domain;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "patient")   
public class Patient {

	 
	@Id
	@GeneratedValue
	private Long patient_id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String city;

	@Column(nullable = false)
	private String dob;

	@Column(nullable = false)
	private Long mobile;

//	@Column(nullable = false)
//	private double age;
	
	@Column(nullable = true)
 	private String email;
	

	@Column(name = "center", nullable = true)
	private String language;

	@Column(name = "gender", nullable = true)
	private String genre;
	
	//
	@Column(name = "bg", nullable = true)
	private String bg;
	//
	
	@Column(name = "organ", nullable = true)
	private String organ;

	//

	public Long getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Long patient_id) {
		this.patient_id = patient_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	//

	public String getBg() {
		return bg;
	}

	public void setBg(String bg) {
		this.bg = bg;
	}

//	
	
	
	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}
	
	//
	public String getOrgan() {
		return organ;
	}
    
	public void setOrgan(String organ) {
		this.organ = organ;
	}
	//
	
	
}