package com.waracle.cakemgr.resource;

import com.waracle.cakemgr.dao.entity.CakeEntity;
import com.waracle.cakemgr.dto.request.CakeRequestDto;
import com.waracle.cakemgr.dto.response.CakeResponseDto;
import com.waracle.cakemgr.mapper.CakeMapper;
import com.waracle.cakemgr.service.CakeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;

@RestController
@RequestMapping("/cakes")
public class CakeResource {

  private final CakeService service;

  public CakeResource(CakeService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<CakeResponseDto>> getCakes() {
    List<CakeResponseDto> cakes = service.getCakes().stream()
        .map(CakeMapper::fromEntityToResponseDto)
        .collect(Collectors.toList());

    return ResponseEntity.ok().body(cakes);
  }

  @PostMapping
  public ResponseEntity<String> postCake(@Valid @RequestBody CakeRequestDto cake) {
    CakeEntity cakeEntity = CakeMapper.fromRequestDtoToEntity(cake);
    service.writeCake(cakeEntity);
    return ResponseEntity.ok().build();
  }
}
