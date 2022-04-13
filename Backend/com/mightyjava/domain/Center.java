package com.mightyjava.domain;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "center")   
public class Center {

	 
	@Id
	@GeneratedValue
	private int center_id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String city;

	@Column(nullable = false)
	private Long mobile;

	public int getCenter_id() {
		return center_id;
	}

	public void setCenter_id(int center_id) {
		this.center_id = center_id;
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

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}

	 

}
