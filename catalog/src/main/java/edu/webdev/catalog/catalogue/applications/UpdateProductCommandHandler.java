package edu.webdev.catalog.catalogue.applications;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.webdev.catalog.catalogue.applications.commands.UpdateProductCommand;
import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.ProductRepository;
import edu.webdev.catalog.shared.base.CommandHandler;
import edu.webdev.catalog.shared.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateProductCommandHandler implements CommandHandler<UpdateProductCommand> {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional
    public void handle(UpdateProductCommand command) {
        Product product = productRepository.findById(command.id().getValue())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        productMapper.updateProductFromCommand(command, product);
        productRepository.save(product);
    }
}
