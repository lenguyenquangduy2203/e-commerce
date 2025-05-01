package edu.webdev.catalog.catalogue.applications.commands;


import edu.webdev.catalog.catalogue.domain.Category;
import edu.webdev.catalog.catalogue.domain.Description;
import edu.webdev.catalog.catalogue.domain.Model;
import edu.webdev.catalog.catalogue.domain.ProductName;
import edu.webdev.catalog.catalogue.domain.StockQuantity;
import edu.webdev.catalog.shared.base.Command;
import edu.webdev.catalog.shared.utils.Money;

public record CreateProductCommand(
    ProductName name,
    Model model,
    Description description,
    Money price,
    StockQuantity stockQuantity,
    Category category
) implements Command {}
