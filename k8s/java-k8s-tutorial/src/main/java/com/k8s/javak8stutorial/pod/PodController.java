package com.k8s.javak8stutorial.pod;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.api.model.PodBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pods")
public class PodController {
	private final PodService podService;
	private KubernetesClient k8s = new DefaultKubernetesClient();

	@GetMapping
	public ResponseEntity<List<Pod>> getPodsInDeafult() {
		List<Pod> list = k8s.pods().inNamespace("default").list().getItems();

		return ResponseEntity.ok(list);
	}

	@PostMapping("/pod")
	public ResponseEntity<String> createPod() {
		Pod aPod = new PodBuilder().withNewMetadata().withName("demo-pod1").endMetadata()
				.withNewSpec()
				.addNewContainer()
				.withName("nginx")
				.withImage("nginx:1.14.2")
				.addNewPort().withContainerPort(80).endPort()
				.endContainer()
				.endSpec().build();

		Pod createPod = k8s.pods().inNamespace("default").create(aPod);

		String status = createPod.getStatus().toString();

		return ResponseEntity.ok(status);
	}
}
