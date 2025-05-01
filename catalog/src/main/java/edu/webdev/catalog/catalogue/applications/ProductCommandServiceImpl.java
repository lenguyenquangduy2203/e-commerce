package edu.webdev.catalog.catalogue.applications;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.ProductCommandService;
import edu.webdev.catalog.catalogue.applications.commands.CreateProductCommand;
import edu.webdev.catalog.catalogue.applications.commands.DeleteProductCommand;
import edu.webdev.catalog.catalogue.applications.commands.UpdateProductCommand;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductCommandServiceImpl implements ProductCommandService {
    private final CreateProductCommandHandler createProductCommandHandler;
    private final UpdateProductCommandHandler updateProductCommandHandler;
    private final DeleteProductCommandHandler deleteProductCommandHandler;

    @Override
    public void addNewProduct(CreateProductCommand command) {
        createProductCommandHandler.handle(command);
    }

    @Override
    public void modifyProduct(UpdateProductCommand command) {
        updateProductCommandHandler.handle(command);
    }

    @Override
    public void deleteProduct(DeleteProductCommand command) {
        deleteProductCommandHandler.handle(command);
    }
}
