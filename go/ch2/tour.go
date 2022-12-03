package main

import "fmt"

func swap(s, s2 string) (string, string) {
	return s2, s
}

func add(i, i2 int) int {
	return i + i2
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

const code string = "HELLO_WORLD"

func main() {

	fmt.Println(add(42, 13))

	a, b := swap("hello", "world")
	fmt.Println(a, b)

	fmt.Println(split(17))

	x := -10
	fmt.Println(uint8(x))

	fmt.Println(code + "sss")
}
