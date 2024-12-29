package com.example.demo.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.security.TokenUtils;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserMapper {

	private final TokenUtils tokenUtils;
	private final PasswordEncoder passwordEncoder;

	public User dtoToModel(UserDTO dto) {
		if (dto == null) {
			return null;
		}
		User model = new User();
		model.setId(dto.getId());
		model.setEmail(dto.getEmail());
		model.setPassword(passwordEncoder.encode(dto.getPassword()));
		model.setPushToken(dto.getPushToken());
		return model;
	}

	public UserDTO modelToDto(User model) {
		if (model == null) {
			return null;
		}
		UserDTO dto = new UserDTO();
		dto.setId(model.getId());
		dto.setEmail(model.getEmail());
		dto.setPassword(model.getPassword());
		dto.setPushToken(model.getPushToken());
		dto.setToken(tokenUtils.generateToken(dto.getEmail()));
		return dto;
	}

}
