package edu.webdev.catalog.catalogue.applications.commands;

import edu.webdev.catalog.catalogue.domain.ProductId;
import edu.webdev.catalog.shared.base.Command;

public record DeleteProductCommand(
    ProductId id
) implements Command {}
