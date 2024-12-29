package com.example.demo.dto;

import lombok.NoArgsConstructor;

import lombok.Setter;

import lombok.Getter;

@NoArgsConstructor
@Getter
@Setter
public class CartItemDTO {

	private Long id;
	private ProductDTO product;
	private Long quantity;

}
