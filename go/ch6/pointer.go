package main

import "fmt"

func failedUpdate(g *int) {
	x := 10
	g = &x
}

func update(g *int) {
	*g = 20
}

func main() {
	var f *int
	failedUpdate(f)
	fmt.Println(f) // nil

	x := 10
	failedUpdate(&x)
	fmt.Println(x) // 10
	update(&x)
	fmt.Println(x) // 20
}
