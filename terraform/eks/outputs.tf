output "eks_result" {
  description = "eks_node_group"
  value       = module.eks.eks_managed_node_groups
}

output "cluster_version" {
  value = module.eks.cluster_version
}