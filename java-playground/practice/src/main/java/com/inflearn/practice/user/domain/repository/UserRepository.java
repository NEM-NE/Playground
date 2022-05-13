package com.inflearn.practice.user.domain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.inflearn.practice.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByName(String keyword, Pageable pageable);
}
