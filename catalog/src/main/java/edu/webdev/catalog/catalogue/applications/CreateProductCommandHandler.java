package edu.webdev.catalog.catalogue.applications;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.applications.commands.CreateProductCommand;
import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.ProductRepository;
import edu.webdev.catalog.shared.base.CommandHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateProductCommandHandler implements CommandHandler<CreateProductCommand> {
    private final ProductRepository productRepository;

    @Override
    public void handle(CreateProductCommand command) {
        Product product = Product.builder()
            .name(command.name().getValue())
            .model(command.model().getValue())
            .description(command.description().getValue())
            .amount(command.price().getAmount())
            .currency(command.price().getCurrency().getSymbol())
            .stockQuantity(command.stockQuantity().getValue())
            .category(command.category().getValue())
            .build();
            
        productRepository.save(product);
    }
}
