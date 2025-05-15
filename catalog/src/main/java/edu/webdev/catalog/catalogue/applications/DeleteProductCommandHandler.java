package edu.webdev.catalog.catalogue.applications;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.applications.commands.DeleteProductCommand;
import edu.webdev.catalog.infrastructure.persistence.repositories.ProductRepository;
import edu.webdev.catalog.shared.base.CommandHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeleteProductCommandHandler implements CommandHandler<DeleteProductCommand> {
    private final ProductRepository productRepository;

    @Override
    public void handle(DeleteProductCommand command) {
        productRepository.deleteById(command.id().getValue());
    }
}
