package com.waracle.cakemgr.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waracle.cakemgr.dao.entity.CakeEntity;
import com.waracle.cakemgr.dao.repository.CakeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Set;
import javax.annotation.PostConstruct;

@Service
public class CakeService {

  private final CakeRepository repository;
  private final String cakeUrl;
  private final ObjectMapper objectMapper;

  public CakeService(CakeRepository repository, String cakeUrl, ObjectMapper objectMapper) {
    this.repository = repository;
    this.cakeUrl = cakeUrl;
    this.objectMapper = objectMapper;
  }

  @PostConstruct
  public void populateCakes() throws IOException {
    Set<CakeEntity> cakes = objectMapper.readValue(new URL(cakeUrl), new TypeReference<Set<CakeEntity>>() {});
    repository.saveAll(cakes);
  }

  public List<CakeEntity> getCakes() {
    return repository.findAll();
  }

  public void writeCake(CakeEntity cake) {
    repository.save(cake);
  }
}
