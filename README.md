📦 Environment Configuration Guide
This project follows a microservices architecture. Each service is configured using its own .env file to manage environment-specific settings such as database URIs, ports, and internal service URLs. This helps maintain separation of concerns, improve security, and enable scalability.

🌐 Common Variables (Required for All Services)
Every microservice must include the following base environment variables:
PORT=3000                              # The port the service listens on
DATABASE=mongodb://localhost/service   # MongoDB connection URI specific to the service

🔧 Service-Specific Variables
Below are additional required variables for each service:

🧮 Billing & Payment Service
PORT=4001
DATABASE=mongodb://localhost:27017/billing-db
SETTINGS_API_URL=http://settings-service:8881/api/setting/listAll
