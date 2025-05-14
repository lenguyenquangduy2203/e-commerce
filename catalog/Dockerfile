# 1️⃣ Build the JAR using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# 2️⃣ Use a lightweight JDK image to run the JAR
FROM eclipse-temurin:21-jdk

WORKDIR /app

# ✅ Install MySQL client (for mysqladmin)
RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Add the wait-for-mysql.sh script
COPY wait-for-mysql.sh .

# Copy the built JAR from the builder stage
COPY --from=build /app/target/*.jar app.jar

# Ensure the wait script is executable
RUN chmod +x wait-for-mysql.sh

EXPOSE 8080

# Wait for MySQL, then start the app
ENTRYPOINT ["./wait-for-mysql.sh", "java", "-jar", "app.jar"]
