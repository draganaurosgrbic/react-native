package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

	private final ProductRepository repo;
	private final UserService userService;

	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return repo.findAll();
	}

	@Transactional(readOnly = true)
	public List<Product> findAllMy() {
		return repo.findByOwnerId(userService.getLoggedInUser().getId());
	}

	@Transactional
	public Product save(Product product) {
		product.setOwner(userService.getLoggedInUser());
		return repo.save(product);
	}

	@Transactional
	public void delete(Long id) {
		repo.deleteById(id);
	}

}
