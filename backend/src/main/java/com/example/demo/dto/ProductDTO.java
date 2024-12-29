package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProductDTO {

	private Long id;
	private String title;
	private String description;
	private String imageUrl;
	private Double price;
	private UserDTO owner;

}
