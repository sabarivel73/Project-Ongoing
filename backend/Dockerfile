FROM public.ecr.aws/docker/library/eclipse-temurin:17
WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar /app
EXPOSE 8000
CMD ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]