package edu.webdev.catalog.catalogue.applications.commands;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.webdev.catalog.catalogue.domain.Category;
import edu.webdev.catalog.catalogue.domain.Description;
import edu.webdev.catalog.catalogue.domain.Model;
import edu.webdev.catalog.catalogue.domain.ProductId;
import edu.webdev.catalog.catalogue.domain.ProductName;
import edu.webdev.catalog.catalogue.domain.StockQuantity;
import edu.webdev.catalog.shared.base.Command;
import edu.webdev.catalog.shared.utils.Money;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UpdateProductCommand(
    ProductId id,
    ProductName name,
    Model model,
    Description description,
    Money price,
    StockQuantity stockQuantity,
    Category category
) implements Command {}
