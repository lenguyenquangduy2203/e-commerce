package edu.webdev.catalog.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.webdev.catalog.dto.ServiceRegistrationRequest;

import jakarta.validation.Valid;


/**
 * Controller for managing service registrations in an in-memory registry.
 * The registry map is injected by Spring.
 * Uses JSON for requests (for registration) and returns JSON responses.
 * Includes basic input validation for registration.
 */
@RestController
@RequestMapping("/registry")
public class RegistryController {

    // The service registry map will be injected by Spring
    private final Map<String, String> services;

    /**
     * Constructs the RegistryController and injects the service registry map bean.
     * Spring automatically provides the singleton Map bean defined in RegistryConfig.
     *
     * @param services The ConcurrentHashMap bean injected by Spring.
     */
    @Autowired
    public RegistryController(Map<String, String> services) {
        this.services = services;
    }

    /**
     * Registers a new service with a given name and URL provided in a JSON request body.
     * Uses Bean Validation (@NotBlank in the DTO) triggered by @Valid.
     *
     * @param request The JSON request body automatically mapped to ServiceRegistrationRequest.
     * @return A ResponseEntity:
     * - 200 OK with a success message in JSON if registered.
     * - 400 BAD REQUEST if validation fails (handled by global exception handler typically).
     * - 409 CONFLICT with an error message in JSON if the service name already exists.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid ServiceRegistrationRequest request) {
        // @Valid triggers validation based on constraints in ServiceRegistrationRequest
        // If validation fails, a MethodArgumentNotValidException is thrown before this point.

        String name = request.getName();
        String url = request.getUrl();

        // Manual check for null/empty is less necessary if using @NotBlank and @Valid,
        // keeping the conflict check as it's business logic specific to the registry.
        if (services.containsKey(name)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body(Map.of("error", "Service '" + name + "' is already registered."));
        }

        services.put(name, url);
        // Return a JSON success message
        return ResponseEntity.ok(Map.of("message", "Registered " + name + " at " + url));
    }

    /**
     * Retrieves a list of all registered services.
     *
     * @return A ResponseEntity containing a JSON map of all registered service names and their URLs.
     */
    @GetMapping
    public ResponseEntity<Map<String, String>> listServices() {
        // Returns the services map, which Spring will automatically serialize to JSON.
        return ResponseEntity.ok(services);
    }

    /**
     * Retrieves the URL of a registered service by its name.
     *
     * @param name The name of the service to retrieve, provided as a path variable.
     * @return A ResponseEntity containing:
     * - 200 OK with the service details (name and url) in JSON if found.
     * - 404 NOT FOUND with an error message in JSON if the service does not exist.
     */
    @GetMapping("/{name}")
    public ResponseEntity<Map<String, String>> getService(@PathVariable String name) {
        String url = services.get(name);
        if (url == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", "Service '" + name + "' not found."));
        }
        // Return service details as a JSON object.
        return ResponseEntity.ok(Map.of("name", name, "url", url));
    }

    /**
     * Removes a registered service by its name.
     *
     * @param name The name of the service to remove, provided as a path variable.
     * @return A ResponseEntity indicating the result of the removal:
     * - 200 OK with a success message in JSON if removed.
     * - 404 NOT FOUND with an error message in JSON if the service does not exist.
     */
    @DeleteMapping("/{name}")
    public ResponseEntity<Map<String, String>> removeService(@PathVariable String name) {
        String removedUrl = services.remove(name);
        if (removedUrl == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", "Service '" + name + "' not found."));
        }
        // Return a JSON success message including the removed URL for confirmation.
        return ResponseEntity.ok(Map.of("message", "Removed " + name, "url", removedUrl));
    }
}