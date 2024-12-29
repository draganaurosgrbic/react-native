package com.example.demo.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dto.CartItemDTO;
import com.example.demo.model.CartItem;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CartItemMapper {

	private final ProductMapper productMapper;

	public CartItem dtoToModel(CartItemDTO dto) {
		if (dto == null) {
			return null;
		}
		CartItem model = new CartItem();
		model.setId(dto.getId());
		model.setProduct(productMapper.dtoToModel(dto.getProduct()));
		model.setQuantity(dto.getQuantity());
		return model;
	}

	public CartItemDTO modelToDto(CartItem model) {
		if (model == null) {
			return null;
		}
		CartItemDTO dto = new CartItemDTO();
		dto.setId(model.getId());
		dto.setProduct(productMapper.modelToDto(model.getProduct()));
		dto.setQuantity(model.getQuantity());
		return dto;
	}

	public Set<CartItem> dtoToModel(List<CartItemDTO> dto) {
		return dto.stream().map(item -> dtoToModel(item)).collect(Collectors.toSet());
	}

	public List<CartItemDTO> modelToDto(Set<CartItem> model) {
		return model.stream().map(item -> modelToDto(item)).collect(Collectors.toList());
	}

}
