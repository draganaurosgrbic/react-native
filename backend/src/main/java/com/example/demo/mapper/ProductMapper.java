package com.example.demo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dto.ProductDTO;
import com.example.demo.model.Product;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ProductMapper {

	private final UserMapper userMapper;

	public Product dtoToModel(ProductDTO dto) {
		if (dto == null) {
			return null;
		}
		Product model = new Product();
		model.setId(dto.getId());
		model.setTitle(dto.getTitle());
		model.setDescription(dto.getDescription());
		model.setImageUrl(dto.getImageUrl());
		model.setPrice(dto.getPrice());
		model.setOwner(userMapper.dtoToModel(dto.getOwner()));
		return model;
	}

	public ProductDTO modelToDto(Product model) {
		if (model == null) {
			return null;
		}
		ProductDTO dto = new ProductDTO();
		dto.setId(model.getId());
		dto.setTitle(model.getTitle());
		dto.setDescription(model.getDescription());
		dto.setImageUrl(model.getImageUrl());
		dto.setPrice(model.getPrice());
		dto.setOwner(userMapper.modelToDto(model.getOwner()));
		return dto;
	}

	public List<ProductDTO> modelToDto(List<Product> model) {
		return model.stream().map(item -> modelToDto(item)).collect(Collectors.toList());
	}

}
