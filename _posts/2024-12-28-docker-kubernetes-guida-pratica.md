---
layout: post
title: "Docker e Kubernetes: Guida Pratica per Iniziare"
date: 2024-12-28
author: "Oltrematica Team"
linkedin: "oltrematica"
tags: [Docker, Kubernetes, DevOps, Cloud]
reading_time: 12
excerpt: "Una guida pratica per comprendere e utilizzare Docker e Kubernetes nel tuo flusso di lavoro DevOps."
image: https://picsum.photos/seed/docker/1200/630
---

Docker e Kubernetes sono diventati strumenti essenziali nel mondo dello sviluppo moderno. Questa guida ti aiuterà a comprendere i concetti fondamentali e a iniziare a utilizzarli nei tuoi progetti.

## Cos'è Docker?

Docker è una piattaforma per sviluppare, distribuire ed eseguire applicazioni in container. I container permettono di impacchettare un'applicazione con tutte le sue dipendenze in un'unità standardizzata.

### Vantaggi dei Container

1. **Portabilità**: "Funziona sul mio computer" diventa "funziona ovunque"
2. **Isolamento**: Ogni container è isolato dagli altri
3. **Efficienza**: Più leggeri delle virtual machine
4. **Consistenza**: Stesso ambiente in dev, staging e produzione

## Dockerfile: Il Punto di Partenza

Un Dockerfile definisce come costruire la tua immagine:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Best Practices per Dockerfile

1. **Usa immagini base specifiche**: `node:18-alpine` invece di `node:latest`
2. **Multi-stage builds**: Separa build e runtime
3. **Layer caching**: Copia dipendenze prima del codice
4. **Minimizza layer**: Combina comandi RUN dove possibile

## Docker Compose per Ambienti Multi-Container

Docker Compose gestisce applicazioni multi-container:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Introduzione a Kubernetes

Kubernetes (K8s) è un sistema di orchestrazione per container che automatizza deployment, scaling e gestione di applicazioni containerizzate.

### Concetti Fondamentali

#### Pod

Il più piccolo unità deployable in Kubernetes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: my-app:1.0
    ports:
    - containerPort: 3000
```

#### Deployment

Gestisce repliche di Pod:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:1.0
        ports:
        - containerPort: 3000
```

#### Service

Espone i Pod alla rete:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Workflow Completo

### 1. Sviluppo Locale con Docker

```bash
# Build dell'immagine
docker build -t my-app:1.0 .

# Run del container
docker run -p 3000:3000 my-app:1.0

# Docker Compose per ambiente completo
docker-compose up
```

### 2. Push al Registry

```bash
# Tag dell'immagine
docker tag my-app:1.0 myregistry.azurecr.io/my-app:1.0

# Push al registry
docker push myregistry.azurecr.io/my-app:1.0
```

### 3. Deploy su Kubernetes

```bash
# Apply delle configurazioni
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Verifica lo status
kubectl get pods
kubectl get services
```

## Monitoring e Debugging

### Logs dei Container

```bash
# Docker
docker logs container-id

# Kubernetes
kubectl logs pod-name
kubectl logs -f pod-name  # follow
```

### Accesso ai Container

```bash
# Docker
docker exec -it container-id /bin/sh

# Kubernetes
kubectl exec -it pod-name -- /bin/sh
```

## Health Checks

Implementa health checks per garantire affidabilità:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Scaling

### Scaling Manuale

```bash
kubectl scale deployment my-app-deployment --replicas=5
```

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Conclusione

Docker e Kubernetes sono strumenti potenti che, una volta padroneggiati, possono trasformare il tuo workflow di sviluppo e deployment. Inizia con Docker per containerizzare le tue applicazioni, poi esplora Kubernetes quando hai bisogno di orchestrazione avanzata.

La curva di apprendimento può sembrare ripida, ma i benefici in termini di scalabilità, affidabilità e portabilità ne valgono assolutamente la pena!
