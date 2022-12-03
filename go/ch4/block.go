package main

import "fmt"

func main() {
	shadowing()
}

func shadowing() {
	x := 10

	if x > 5 {
		fmt.Println(x) // 10
		x := 5         // shadowing variable -> exist same name variable in block , so we have to avoid ":=" operation
		fmt.Println(x) // 5
	}

	fmt.Println(x) // 10
}
