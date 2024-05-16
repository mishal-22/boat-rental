package com.example.project.dto;

public class BookedResponse {

	private Long bookedId;
	private String boatName;

	private String ownerName;

	private int capacity;

	private int price;

	private String description;

	private String image;

	private boolean isActive;
	private String name;
	private String email;
	private String phone;
	private String date;

	private String startTime;

	private String endTime;

	public BookedResponse() {

		// TODO Auto-generated constructor stub
	}

	public BookedResponse(Long bookedId, String boatName, String ownerName, int capacity, int price, String description,
			String image, boolean isActive, String name, String email, String phone, String date, String startTime,
			String endTime) {
		this.boatName = boatName;
		this.ownerName = ownerName;
		this.capacity = capacity;
		this.price = price;
		this.description = description;
		this.image = image;
		this.isActive = isActive;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.bookedId = bookedId;
	}

	public Long getBookedId() {
		return bookedId;
	}

	public void setBookedId(Long bookedId) {
		this.bookedId = bookedId;
	}

	public String getBoatName() {
		return boatName;
	}

	public void setBoatName(String boatName) {
		this.boatName = boatName;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

}
