# 1️⃣ Use Maven to build the JAR in a temporary container
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# 2️⃣ Use a lightweight JDK image to run the JAR
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
