package com.waracle.cakemgr.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.waracle.cakemgr.dao.entity.CakeEntity;
import com.waracle.cakemgr.dto.request.CakeRequestDto;
import com.waracle.cakemgr.dto.response.CakeResponseDto;
import org.junit.jupiter.api.Test;

class CakeMapperTest {

  @Test
  void testMapFromEntityToResponseDto() {
    CakeEntity cakeEntity = new CakeEntity();
    cakeEntity.setTitle("testTitle123");
    cakeEntity.setDesc("testDescription123");
    cakeEntity.setImage("testImageUrl123");

    CakeResponseDto expectedResponseDto = new CakeResponseDto();
    expectedResponseDto.setName("testTitle123");
    expectedResponseDto.setDescription("testDescription123");
    expectedResponseDto.setImageUrl("testImageUrl123");

    CakeResponseDto actualResponseDto = CakeMapper.fromEntityToResponseDto(cakeEntity);

    assertThat(actualResponseDto).isEqualTo(expectedResponseDto);
  }

  @Test
  void testMapFromRequestDtoToEntity() {
    CakeRequestDto cakeRequestDto = new CakeRequestDto();
    cakeRequestDto.setName("testTitle123");
    cakeRequestDto.setDescription("testDescription123");
    cakeRequestDto.setImageUrl("testImageUrl123");

    CakeEntity expectedCakeEntity = new CakeEntity();
    expectedCakeEntity.setTitle("testTitle123");
    expectedCakeEntity.setDesc("testDescription123");
    expectedCakeEntity.setImage("testImageUrl123");

    CakeEntity actualEntity = CakeMapper.fromRequestDtoToEntity(cakeRequestDto);

    assertThat(actualEntity).isEqualTo(expectedCakeEntity);
  }

}
