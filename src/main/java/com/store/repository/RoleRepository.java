package com.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.Role;

public interface RoleRepository extends JpaRepository<Role, String>{

}
