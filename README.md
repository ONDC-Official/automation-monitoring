
# Application Logs and Metrics Integration

This guide provides instructions for integrating **Loki** for application logs and **Prometheus** for metrics scraping in your project.

---

## **Integrating Loki for Logs**

### 1. Install the Loki Docker Driver

Run the following command to install the Loki Docker driver:

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

### 2. Update `docker-compose.yml`

In your `docker-compose.yml` file, add the following logging configuration to each service:

```yaml
logging:
  driver: loki
  options:
    loki-url: "http://localhost:3100/loki/api/v1/push"
```

---

With these configurations, your application logs will be sent to Loki, which can be then visualised in Grafana.



