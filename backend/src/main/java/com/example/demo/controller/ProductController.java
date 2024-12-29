package com.example.demo.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProductDTO;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("isAuthenticated()")
@AllArgsConstructor
public class ProductController {

	private final ProductService productService;
	private final ProductMapper productMapper;

	@GetMapping
	public ResponseEntity<List<ProductDTO>> findAll() {
		return ResponseEntity.ok(productMapper.modelToDto(productService.findAll()));
	}

	@GetMapping("/my")
	public ResponseEntity<List<ProductDTO>> findAllMy() {
		return ResponseEntity.ok(productMapper.modelToDto(productService.findAllMy()));
	}

	@PostMapping
	public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto) {
		return ResponseEntity.ok(productMapper.modelToDto(productService.save(productMapper.dtoToModel(dto))));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO dto) {
		return ResponseEntity.ok(productMapper.modelToDto(productService.save(productMapper.dtoToModel(dto))));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		productService.delete(id);
		return ResponseEntity.ok().build();
	}

}
