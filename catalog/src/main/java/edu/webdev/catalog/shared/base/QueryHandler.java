package edu.webdev.catalog.shared.base;

public interface QueryHandler<Q extends Query<R>, R> {
    R handle(Q query);
}
