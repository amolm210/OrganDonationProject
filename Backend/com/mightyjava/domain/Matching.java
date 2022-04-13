package com.mightyjava.domain;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "matching")   
public class Matching {

	 
	@Id
	@GeneratedValue
	private Long matching_id;
	
	//added later
//	@Column(nullable = false)
//	private Long patient_id;

	@Column(nullable = false)
	private String pname;
	
	@Column(nullable = false)
	private String pmail;
	

	public String getPmail() {
		return pmail;
	}

	public void setPmail(String pmail) {
		this.pmail = pmail;
	}

	public String getDmail() {
		return dmail;
	}

	public void setDmail(String dmail) {
		this.dmail = dmail;
	}

	@Column(nullable = false)
	private String dname;
	
	@Column(nullable = false)
	private String dmail;
	
	
	@Column(nullable = false)
	private String porgan;


	@Column(nullable = false)
	private String pbg;

	
	@Column(nullable = false)
	private String pcity;

	@Column(nullable = false)
	private String pcenter;
	
	@Column(nullable = false)
	private String dcity;
	
	@Column(nullable = false)
	private String dcenter;
	
//	@Column(nullable = false)
// 	private int patient_id;

	public Long getMatchid() {
		return matching_id;
	}

	public void setMatchid(Long matching_id) {
		this.matching_id = matching_id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getDname() {
		return dname;
	}

	public void setDname(String dname) {
		this.dname = dname;
	}

	public String getPorgan() {
		return porgan;
	}

	public void setPorgan(String porgan) {
		this.porgan = porgan;
	}

	public String getPbg() {
		return pbg;
	}

	public void setPbg(String pbg) {
		this.pbg = pbg;
	}

	public String getPcity() {
		return pcity;
	}

	public void setPcity(String pcity) {
		this.pcity = pcity;
	}

	public String getPcenter() {
		return pcenter;
	}

	public void setPcenter(String pcenter) {
		this.pcenter = pcenter;
	}

	public String getDcity() {
		return dcity;
	}

	public void setDcity(String dcity) {
		this.dcity = dcity;
	}

	public String getDcenter() {
		return dcenter;
	}

	public void setDcenter(String dcenter) {
		this.dcenter = dcenter;
	}
 	 
 }
