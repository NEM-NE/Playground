package com.k8s.javak8stutorial.deployment;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.fabric8.kubernetes.api.model.Service;
import io.fabric8.kubernetes.api.model.ServiceBuilder;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;

@RestController
@RequestMapping("/deploys")
public class DeploymentController {
	private final Logger logger = LoggerFactory.getLogger(DeploymentController.class);
	private KubernetesClient k8s = new DefaultKubernetesClient();

	@GetMapping
	public ResponseEntity<List<Deployment>> getDeployments(){
		List<Deployment> deploymentList = k8s.apps().deployments().inNamespace("default").list().getItems();

		return ResponseEntity.ok(deploymentList);
	}

	@PostMapping("/deploy")
	public void releaseDeployment() {
		Deployment deployment = new DeploymentBuilder()
			.withNewMetadata()
				.withName("web-deploy")
				.addToLabels("test", "deployment")
			.endMetadata()
			.withNewSpec()
				.withReplicas(3)
				.withNewSelector()
					.addToMatchLabels("app", "web")
				.endSelector()
				.withNewTemplate()
					.withNewMetadata()
						.addToLabels("app", "web")
					.endMetadata()
					.withNewSpec()
						.addNewContainer()
							.withName("nginx")
							.withImage("nginx:latest")
						.endContainer()
					.endSpec()
				.endTemplate()
			.endSpec().build();

		Service service = new ServiceBuilder()
			.withNewMetadata()
			.withName("web-service-np")
			.endMetadata()
			.withNewSpec()
				.withType("NodePort")
				.withSelector(Collections.singletonMap("app", "web"))
				.addNewPort()
					.withProtocol("TCP")
					.withPort(80)
				.endPort()
			.endSpec().build();

		k8s.apps().deployments().create(deployment);
		k8s.services().inNamespace("default").create(service);

		logger.info("Created service with name {}", service.getMetadata().getName());
		logger.info("Created deployment with name {}", deployment.getMetadata().getName());
	}
}
