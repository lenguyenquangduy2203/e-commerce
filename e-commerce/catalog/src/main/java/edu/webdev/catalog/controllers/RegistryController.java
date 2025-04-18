package edu.webdev.catalog.controllers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing service registrations in an in-memory registry.
 */
@RestController
@RequestMapping("/registry")
public class RegistryController {

    private final Map<String, String> services = new ConcurrentHashMap<>();

    /**
     * Registers a new service with a given name and URL.
     *
     * @param name the name of the service to register; must not be null or empty
     * @param url  the URL of the service to register; must not be null or empty
     * @return a ResponseEntity indicating the result of the registration:
     *         - 200 OK if the service was successfully registered
     *         - 400 BAD REQUEST if the name or URL is invalid
     *         - 409 CONFLICT if the service already exists
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String name, @RequestParam String url) {
        if (name == null || name.isEmpty() || url == null || url.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Service name and URL must not be empty.");
        }

        if (services.containsKey(name)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Service '" + name + "' is already registered.");
        }

        services.put(name, url);
        return ResponseEntity.ok("Registered " + name + " at " + url);
    }

    /**
     * Retrieves a list of all registered services.
     *
     * @return A ResponseEntity containing a map of all registered service names and their URLs.
     */
    @GetMapping
    public ResponseEntity<?> listServices() {
        return ResponseEntity.ok(services);
    }

    /**
     * Retrieves the URL of a registered service by its name.
     *
     * @param name the name of the service to retrieve
     * @return a ResponseEntity containing:
     *         - 200 OK with the service URL if the service is found
     *         - 404 NOT FOUND if the service does not exist
     */
    @GetMapping("/{name}")
    public ResponseEntity<?> getService(@PathVariable String name) {
        String url = services.get(name);
        if (url == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Service '" + name + "' not found.");
        }
        return ResponseEntity.ok(Map.of("name", name, "url", url));
    }

    /**
     * Removes a registered service by its name.
     *
     * @param name the name of the service to remove
     * @return a ResponseEntity indicating the result of the removal:
     *         - 200 OK if the service was successfully removed
     *         - 404 NOT FOUND if the service does not exist
     */
    @DeleteMapping("/{name}")
    public ResponseEntity<?> removeService(@PathVariable String name) {
        String removedUrl = services.remove(name);
        if (removedUrl == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Service '" + name + "' not found.");
        }
        return ResponseEntity.ok("Removed " + name + " with URL " + removedUrl);
    }
}
