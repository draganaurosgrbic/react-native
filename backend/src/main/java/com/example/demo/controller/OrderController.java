package com.example.demo.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderDTO;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/orders", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("isAuthenticated()")
@AllArgsConstructor
public class OrderController {

	private final OrderService orderService;
	private final OrderMapper orderMapper;

	@GetMapping
	public ResponseEntity<List<OrderDTO>> findAll() {
		return ResponseEntity.ok(orderMapper.modelToDto(orderService.findAll()));
	}

	@PostMapping
	public ResponseEntity<OrderDTO> create(@RequestBody OrderDTO dto) {
		return ResponseEntity.ok(orderMapper.modelToDto(orderService.save(orderMapper.dtoToModel(dto))));
	}

}
