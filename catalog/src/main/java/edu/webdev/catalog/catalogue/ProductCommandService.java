package edu.webdev.catalog.catalogue;

import edu.webdev.catalog.catalogue.applications.commands.CreateProductCommand;
import edu.webdev.catalog.catalogue.applications.commands.DeleteProductCommand;
import edu.webdev.catalog.catalogue.applications.commands.UpdateProductCommand;

public interface ProductCommandService {
    void addNewProduct(CreateProductCommand command);
    void modifyProduct(UpdateProductCommand command);
    void deleteProduct(DeleteProductCommand command);
}
