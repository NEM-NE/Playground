package main

import "fmt"

type MailCategory int

// enum
const (
	Uncategorized MailCategory = iota
	Personal
	Spam
	Social
	Advertisements
)

func main() {
	a := []int{}
	fmt.Println(a)

	b := make([]int, 0)
	fmt.Println(b)

	result := composite(multiple, add)
	fmt.Println(result)

	c := 4
	fmt.Println(&c)
	d := &c
	fmt.Println(*d)

	ary := make([]int, 10, 10)
	ary[0] = 1
	ary[1] = 2
	ary[2] = 3
	ary[3] = 4
	fmt.Println(ary)

	ary2 := ary
	ary2[4] = 5
	ary2[5] = 6
	fmt.Println(ary2)
	fmt.Println(ary)

	fmt.Println(Social == MailCategory(3))
}

func multiple(a, b int) int {
	return a * b
}

func add(a, b int) int {
	return a + b
}

func composite(a func(int, int) int, b func(int, int) int) int {
	return a(4, 4) + b(4, 4)
}
