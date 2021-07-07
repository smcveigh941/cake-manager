package com.waracle.cakemgr.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waracle.cakemgr.dao.entity.CakeEntity;
import com.waracle.cakemgr.dao.repository.CakeRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Set;
import javax.annotation.PostConstruct;

@Service
public class CakeService {

  @Value("${cake.url}")
  private String cakeUrl;

  private final CakeRepository repository;
  private final ObjectMapper objectMapper = new ObjectMapper();

  public CakeService(CakeRepository repository) {
    this.repository = repository;
  }

  @PostConstruct
  public void populateCakes() throws IOException {
    Set<CakeEntity> cakes = objectMapper
        .readValue(new URL(cakeUrl), new TypeReference<>() {
        });
    repository.saveAll(cakes);
  }

  public List<CakeEntity> getCakes() {
    return repository.findAll();
  }

  public void writeCake(CakeEntity cake) {
    repository.save(cake);
  }
}
