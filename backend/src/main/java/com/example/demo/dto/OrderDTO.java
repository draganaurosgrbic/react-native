package com.example.demo.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {

	private Long id;
	private Date date;
	private List<CartItemDTO> items;
	private UserDTO owner;

}
