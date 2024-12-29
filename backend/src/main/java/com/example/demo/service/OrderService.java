package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.PushNotification;
import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService {

	private final OrderRepository repo;
	private final UserService userService;
	private final CartItemService cartItemService;
	private final RestTemplate restTemplate;

	@Transactional(readOnly = true)
	public List<Order> findAll() {
		return repo.findByOwnerId(userService.getLoggedInUser().getId());
	}

	@Transactional
	public Order save(Order order) {
		order.setDate(new Date());
		order.setOwner(userService.getLoggedInUser());
		cartItemService.saveAll(order.getItems().stream().collect(Collectors.toList()));
		for (String pushToken : order.getItems().stream().map(item -> item.getProduct().getOwner().getPushToken())
				.collect(Collectors.toList())) {
			restTemplate.postForEntity("https://exp.host/--/api/v2/push/send",
					new PushNotification(pushToken, "Product ordered", "Your product has been ordered"), Void.class);
		}
		return repo.save(order);
	}

}
