package edu.webdev.catalog.shared.base;

public interface Query<R> {
    // The generic type although not used in the interface but can provide
    // type safety, flexibility, and scalability when using with QueryHandler
    
    // For the time being, this base interface is just a marker
    // Can be extended to contain query metadata in the future
}
