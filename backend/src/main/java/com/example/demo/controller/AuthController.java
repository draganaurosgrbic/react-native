package com.example.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDTO;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class AuthController {

	private final UserService userService;
	private final UserMapper userMapper;

	@PostMapping("/register")
	public ResponseEntity<UserDTO> register(@RequestBody UserDTO dto) {
		return ResponseEntity.ok(userMapper.modelToDto(userService.register(userMapper.dtoToModel(dto))));
	}

	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody UserDTO dto) {
		return ResponseEntity.ok(userMapper.modelToDto(userService.login(dto.getEmail(), dto.getPassword())));
	}

}
