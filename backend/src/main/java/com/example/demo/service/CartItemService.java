package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.CartItem;
import com.example.demo.repository.CartItemRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartItemService {

	private final CartItemRepository repo;

	@Transactional
	public List<CartItem> saveAll(List<CartItem> items) {
		return repo.saveAll(items);
	}

}
