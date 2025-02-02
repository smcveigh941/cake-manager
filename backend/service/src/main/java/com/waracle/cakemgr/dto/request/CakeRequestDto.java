package com.waracle.cakemgr.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CakeRequestDto {

  @NotBlank
  private String name;

  @NotBlank
  private String description;

  @NotBlank
  private String imageUrl;
}
