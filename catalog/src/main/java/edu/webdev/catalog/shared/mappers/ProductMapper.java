package edu.webdev.catalog.shared.mappers;

import java.math.BigDecimal;
import java.util.Currency;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import edu.webdev.catalog.catalogue.applications.commands.UpdateProductCommand;
import edu.webdev.catalog.catalogue.domain.Category;
import edu.webdev.catalog.catalogue.domain.Description;
import edu.webdev.catalog.catalogue.domain.Model;
import edu.webdev.catalog.catalogue.domain.ProductId;
import edu.webdev.catalog.catalogue.domain.ProductName;
import edu.webdev.catalog.catalogue.domain.StockQuantity;
import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.shared.utils.Money;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "amount", expression = "java(mapAmount(Money price))")
    @Mapping(target = "currency", expression = "java(mapCurrency(Money price))")
    @Mapping(target = "cartItems", ignore = true)
    void updateProductFromCommand(UpdateProductCommand command, @MappingTarget Product product);

    default ProductId mapId(Long id) {
        return ProductId.of(id);
    }

    default ProductName mapName(String name) {
        return ProductName.create(name);
    }

    default Model mapModel(String model) {
        return Model.create(model);
    }

    default Description mapDescription(String description) {
        return Description.create(description);
    }

    default Money mapPrice(BigDecimal amount, String currency) {
        return Money.create(amount, Currency.getInstance(currency));
    }

    default StockQuantity mapStockQuantity(int stockQuantity) {
        return StockQuantity.create(stockQuantity);
    }

    default Category mapCategory(String category) {
        return Category.create(category);
    }

    default Long mapDomainId(ProductId id) {
        return id.getValue();
    }

    default String mapDomainName(ProductName name) {
        return name.getValue();
    }

    default String mapDomainModel(Model model) {
        return model.getValue();
    }

    default String mapDomainDescription(Description description) {
        return description.getValue();
    }

    default BigDecimal mapAmount(Money price) {
        return price.getAmount();
    }

    default String mapCurrency(Money price) {
        return price.getCurrency().getCurrencyCode();
    }

    default int mapDomainStockQuantity(StockQuantity stockQuantity) {
        return stockQuantity.getValue();
    }

    default String mapDomainCategory(Category category) {
        return category.getValue();
    }
}
