INSERT INTO users (id, email, password, role) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'user8@example.com', '{bcrypt}$2b$12$Yk9oGzSYskOdgqQAR7AihuSohO3yHujnK4Wl62IOk9b5KG0.O9Jxu', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user6@example.com', '{bcrypt}$2b$12$zsv2tamyPumx1ZHsKXyvzuSZmhYfEsJh50toKXej1OXhaix.xL98.', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user5@example.com', '{bcrypt}$2b$12$X0JagUUh5NTuqya6ycgbau0bLPv/wcKzI4nFbxK.Fw8kUtSSyXMkK', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'manager@example.com', '{bcrypt}$2b$12$aTuOO3OVaTN7TlL389Gr1OLcxHHcSWlt/nAcJALMRXTOW6ESxGx3.', 'ROLE_MANAGER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3@example.com', '{bcrypt}$2b$12$3aioBgOySKeoS7DQEPQNPecxwz93.HiwR3IJOldRqGv81K0LCTXce', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'admin@example.com', '{bcrypt}$2b$12$7GEgzZgnTdNgBzbMp80ZveaHmlz5aET8xIHlBhEShGq3OCKsHvrM2', 'ROLE_ADMIN'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2@example.com', '{bcrypt}$2b$12$sM83yhHFYyDt0.tktu.t1e6Q7atE0mN/EvuFsSaj6Ja1v1SHNyrse', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user1@example.com', '{bcrypt}$2b$12$zmAWi5.Mx2uNfrXKMDOYEONJEBvHeBpXiwxEh824HwbgM0qKecrc2', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user4@example.com', '{bcrypt}$2b$12$ugEhYJAMURZ3Y2xKnAIzHeMpUwtyoCQ.U6r2UEZ5jWu6d9pTWkJj2', 'ROLE_USER'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user7@example.com', '{bcrypt}$2b$12$z5Kb/xi0JSTB36USjPYm0O4c.getejUPb.awu/XJruvJ744vO.gzO', 'ROLE_USER');

INSERT INTO products (name, model, description, amount, currency, stock_quantity, category) VALUES
('Ring A', 'R-A', 'Silver Ring A', 50.00, 'USD', 100, 'Rings'),
('Ring B', 'R-B', 'Gold Ring B', 150.00, 'USD', 50, 'Rings'),
('Necklace C', 'N-C', 'Pearl Necklace C', 250.00, 'USD', 20, 'Necklaces'),
('Earrings D', 'E-D', 'Diamond Earrings D', 500.00, 'USD', 15, 'Earrings'),
('Bracelet E', 'B-E', 'Silver Bracelet E', 75.00, 'USD', 60, 'Bracelets'),
('Ring F', 'R-F', 'Platinum Ring F', 300.00, 'USD', 10, 'Rings'),
('Necklace G', 'N-G', 'Gold Necklace G', 200.00, 'USD', 25, 'Necklaces'),
('Earrings H', 'E-H', 'Ruby Earrings H', 450.00, 'USD', 30, 'Earrings'),
('Bracelet I', 'B-I', 'Titanium Bracelet I', 120.00, 'USD', 40, 'Bracelets'),
('Ring J', 'R-J', 'Diamond Ring J', 550.00, 'USD', 5, 'Rings');

INSERT INTO carts (user_id, total_price, currency, created_at, updated_at, is_preserved) VALUES
((SELECT id FROM users WHERE email = 'user1@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user2@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user3@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user4@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user5@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user6@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user7@example.com'), 0.00, 'USD', NOW(), NOW(), 0),
((SELECT id FROM users WHERE email = 'user8@example.com'), 0.00, 'USD', NOW(), NOW(), 0);

INSERT INTO orders (user_id, total_price, currency, create_at, status) VALUES
((SELECT id FROM users WHERE email = 'user1@example.com'), 100.00, 'USD', '2025-01-15', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user1@example.com'), 150.00, 'USD', '2025-03-10', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user2@example.com'), 250.00, 'USD', '2024-11-20', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user2@example.com'), 500.00, 'USD', '2025-01-05', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user3@example.com'), 300.00, 'USD', '2025-02-12', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user3@example.com'), 450.00, 'USD', '2025-03-18', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user4@example.com'), 120.00, 'USD', '2025-03-01', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user5@example.com'), 550.00, 'USD', '2025-01-25', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user6@example.com'), 50.00, 'USD', '2025-02-28', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user7@example.com'), 150.00, 'USD', '2025-03-20', 'COMPLETED'),
((SELECT id FROM users WHERE email = 'user8@example.com'), 250.00, 'USD', '2025-02-05', 'COMPLETED');

INSERT INTO order_items (order_id, product_id, product_name, product_model, price_at_purchase, currency, quantity) VALUES
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user1@example.com') AND total_price = 100.00), (SELECT id FROM products WHERE model = 'R-A'), 'Ring A', 'R-A', 50.00, 'USD', 2),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user1@example.com') AND total_price = 150.00), (SELECT id FROM products WHERE model = 'B-E'), 'Bracelet E', 'B-E', 75.00, 'USD', 2),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user2@example.com') AND total_price = 250.00), (SELECT id FROM products WHERE model = 'N-C'), 'Necklace C', 'N-C', 250.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user2@example.com') AND total_price = 500.00), (SELECT id FROM products WHERE model = 'E-D'), 'Earrings D', 'E-D', 500.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user3@example.com') AND total_price = 300.00), (SELECT id FROM products WHERE model = 'R-F'), 'Ring F', 'R-F', 300.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user3@example.com') AND total_price = 450.00), (SELECT id FROM products WHERE model = 'E-H'), 'Earrings H', 'E-H', 450.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user4@example.com') AND total_price = 120.00), (SELECT id FROM products WHERE model = 'B-I'), 'Bracelet I', 'B-I', 120.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user5@example.com') AND total_price = 550.00), (SELECT id FROM products WHERE model = 'R-J'), 'Ring J', 'R-J', 550.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user6@example.com') AND total_price = 50.00), (SELECT id FROM products WHERE model = 'R-A'), 'Ring A', 'R-A', 50.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user7@example.com') AND total_price = 150.00), (SELECT id FROM products WHERE model = 'R-B'), 'Ring B', 'R-B', 150.00, 'USD', 1),
((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'user8@example.com') AND total_price = 250.00), (SELECT id FROM products WHERE model = 'N-C'), 'Necklace C', 'N-C', 250.00, 'USD', 1);
