package main

import "fmt"

type person struct {
	name string
	age  int
}

func main() {
	num := 4

	modifyInt(num)

	fmt.Println(num)

	modifyIntWithPointer(&num)

	fmt.Println(num)

	human := person{
		name: "daniel",
		age:  32,
	}

	modifyPerson(human)
	fmt.Println(human)

	modifyPersonWithPointer(&human)
	fmt.Println(human)

	ary := []int{1, 2, 3, 4}

	modifySlice(ary)
	fmt.Println(ary)

	modifySliceWithPointer(&ary)
	fmt.Println(ary)

	var test person // not default value nil

	var tt []int
	fmt.Println(tt == nil)
}

func modifySliceWithPointer(i *[]int) {
	test := *i
	test[1] = 9
}

func modifySlice(ary []int) {
	ary[1] = 1000
}

func modifyPersonWithPointer(p *person) {
	p.age = 100
	p.name = "hello"
}

func modifyPerson(p person) {
	p.age = 24
	p.name = "sugnbin"
}

func modifyIntWithPointer(num *int) {
	*num = (*num) * (*num)
}

func modifyInt(num int) {
	num = num * num
}
