package com.example.demo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dto.OrderDTO;
import com.example.demo.model.Order;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class OrderMapper {

	private final UserMapper userMapper;
	private final CartItemMapper cartItemMapper;

	public Order dtoToModel(OrderDTO dto) {
		if (dto == null) {
			return null;
		}
		Order model = new Order();
		model.setId(dto.getId());
		model.setDate(dto.getDate());
		model.setItems(cartItemMapper.dtoToModel(dto.getItems()));
		model.setOwner(userMapper.dtoToModel(dto.getOwner()));
		return model;
	}

	public OrderDTO modelToDto(Order model) {
		if (model == null) {
			return null;
		}
		OrderDTO dto = new OrderDTO();
		dto.setId(model.getId());
		dto.setDate(model.getDate());
		dto.setItems(cartItemMapper.modelToDto(model.getItems()));
		dto.setOwner(userMapper.modelToDto(model.getOwner()));
		return dto;
	}

	public List<OrderDTO> modelToDto(List<Order> model) {
		return model.stream().map(item -> modelToDto(item)).collect(Collectors.toList());
	}

}
