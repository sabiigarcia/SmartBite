# Adaptado del Dockerfile del proyecto jakartaee-docker-compose-project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

# Wildfly / Payara como servidor Jakarta EE (igual que el proyecto base)
RUN apt-get update && apt-get install -y wget unzip && \
    wget -q https://github.com/wildfly/wildfly/releases/download/30.0.1.Final/wildfly-30.0.1.Final.zip && \
    unzip -q wildfly-30.0.1.Final.zip && \
    rm wildfly-30.0.1.Final.zip && \
    mv wildfly-30.0.1.Final /opt/wildfly

COPY --from=build /app/target/smartbite-backend.war /opt/wildfly/standalone/deployments/

EXPOSE 8080

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]
