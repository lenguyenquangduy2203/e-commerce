package edu.webdev.catalog.shared.base;

public interface CommandHandler<C extends Command> {
    void handle(C command);
}
