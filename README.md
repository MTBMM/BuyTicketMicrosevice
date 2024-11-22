![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
<img src="https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=fff&style=for-the-badge" alt="Grafana">
<img src="https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=fff&style=for-the-badge" alt="Prometheus">
<img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge" alt="mysql"> 
<img src="https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=fff&style=for-the-badge" alt="Express.js">
<img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=fff&style=for-the-badge" alt="Redis">
<img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=fff&style=for-the-badge" alt="TypeScript">
<img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=fff&style=for-the-badge" alt="Next.js">
<img src="https://img.shields.io/badge/CI%2FCD-4285F4?logo=google&logoColor=fff&style=for-the-badge" alt="CI/CD">
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=for-the-badge" alt="GitHub Actions">

## Table of contents
* 💻[Description](#Description)
* 🏛️[Technology Architecture](#architecture-diagram)
* 🛠️[Prerequisites](#prerequisites)
* 🚀[Getting Started](#getting-started)  
* 📧[Contact](#contact)

## Description
- Project Description: Ticket Selling Platform with Microservices Architecture

   - This project is a ticket-selling platform designed with a microservices architecture to provide a scalable and modular solution. It includes the following features and technologies:

- Key Features:
  - User Authentication:
     - Users can register and log in to create accounts.
  - Ticket Management:
      - Users can create, edit, and sell tickets on the platform.
      - Buyers can browse and purchase any available tickets.
  - Order Expiration:
      - When users place an order but fail to complete payment via Stripe within 15 minutes, the order automatically expires to release the reserved ticket.
- Monitoring and Alerting:
    - Prometheus and Grafana:
        - Metrics from all microservices are monitored in real-time using Prometheus.
        - Grafana is used to visualize the metrics, providing dashboards for service health and performance.
    - Alert Manager:
        - Configured to send alerts via email or SMS when services encounter errors or critical issues.
- CI/CD Pipeline:
  - GitHub Actions:
      - A robust CI/CD pipeline is implemented to automate testing for each microservice.
      - The pipeline ensures automated deployment of the project after successful test validations.
- This architecture ensures a seamless user experience, system reliability, and efficient resource management while supporting continuous integration and deployment workflows.
## Technology Architecture
![image](https://github.com/user-attachments/assets/647c1fb9-3e23-4b3a-bd4a-56f3a0b65163)
