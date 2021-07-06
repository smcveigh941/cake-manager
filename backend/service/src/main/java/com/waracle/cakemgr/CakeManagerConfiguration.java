package com.waracle.cakemgr;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class CakeManagerConfiguration {

  @Value("${db.driver.class.name}")
  private String dbDriverClassName;

  @Value("${db.url}")
  private String dbUrl;

  @Value("${cake.url}")
  private String cakeUrl;

  @Bean
  public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();

    dataSource.setDriverClassName(dbDriverClassName);
    dataSource.setUrl(dbUrl);

    return dataSource;
  }

  @Bean
  public String getCakeUrl() {
    return cakeUrl;
  }

  @Bean
  public ModelMapper getModelMapper() {
    return new ModelMapper();
  }
}
