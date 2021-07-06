package com.waracle.cakemgr.mapper;

import com.waracle.cakemgr.dao.entity.CakeEntity;
import com.waracle.cakemgr.dto.request.CakeRequestDto;
import com.waracle.cakemgr.dto.response.CakeResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CakeMapper {

  private final ModelMapper modelMapper;

  public CakeMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public CakeResponseDto fromEntityToResponseDto(CakeEntity cakeEntity) {
    modelMapper.typeMap(CakeEntity.class, CakeResponseDto.class)
        .addMapping(CakeEntity::getTitle, CakeResponseDto::setName)
        .addMapping(CakeEntity::getDesc, CakeResponseDto::setDescription)
        .addMapping(CakeEntity::getImage, CakeResponseDto::setImageUrl);

    return modelMapper.map(cakeEntity, CakeResponseDto.class);
  }

  public CakeEntity fromRequestDtoToEntity(CakeRequestDto cakeDto) {
    modelMapper.typeMap(CakeRequestDto.class, CakeEntity.class)
        .addMapping(CakeRequestDto::getName, CakeEntity::setTitle)
        .addMapping(CakeRequestDto::getDescription, CakeEntity::setDesc)
        .addMapping(CakeRequestDto::getImageUrl, CakeEntity::setImage);

    return modelMapper.map(cakeDto, CakeEntity.class);
  }

}
