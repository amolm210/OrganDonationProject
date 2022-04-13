package com.mightyjava.domain;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "donar")   
public class Donar {

	 
	@Id
	@GeneratedValue
	private Long donar_id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String city;

	@Column(nullable = false)
	private String dob;

	@Column(nullable = false)
	private Long mobile;

//	@Column(nullable = false)
//	private Double age;
	
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
	
	//
	@Column(name = "organ", nullable = true)
	private String organ;

	//
	public Long getDonar_id() {
		return donar_id;
	}

	public void setDonar_id(Long donar_id) {
		this.donar_id = donar_id;
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

//	public Double getAge() {
//		return age;
//	}
//
//	public void setAge(Double age) {
//		this.age = age;
//	}

	
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
