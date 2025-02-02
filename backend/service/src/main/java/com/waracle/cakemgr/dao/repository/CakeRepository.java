package com.waracle.cakemgr.dao.repository;

import com.waracle.cakemgr.dao.entity.CakeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CakeRepository extends JpaRepository<CakeEntity, UUID> {

}
