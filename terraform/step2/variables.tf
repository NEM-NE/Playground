variable "service-port" {
  description = "the port will use ec2 http request"
  type = number
#   default = 8080
}


variable "number_example" {
  description = "An Example of a number variable in Terraform"
  type = number
  default = 42
}

variable "list_example" {
    description = "An example of a list in Terraform"
    type = list
    default = ["a", "b", "c"]
}

variable "list_numeric_example" {
    type = list(number)
    default = [ 1, 2, 3 ]
}

variable "map_exmaple" {
    type = map(string)
    default = {
        key1 = "value1"
        key2 = "value2"
        key3 = "value3"
    }
}

variable "object_example" {
  type = object({
    name = string
    age = number
    tags = list(string)
    enabled = bool
  })

  default = {
    age = 1
    enabled = false
    name = "value"
    tags = [ "value" ]
  }
}