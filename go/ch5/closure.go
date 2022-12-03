package main

import (
	"fmt"
	"sort"
)

type Person struct {
	name string
	age  int
}

func main() {
	people := []Person{
		{name: "sungbin", age: 12},
		{name: "sung", age: 21},
		{name: "bin", age: 2},
	}

	sort.Slice(people, func(i, j int) bool {
		return people[i].age < people[j].age
	})

	fmt.Println(people)
}

type ReturnFunc func(int) int

func makeMult(base int) ReturnFunc {
	return func(factor int) int {
		return base * factor
	}
}
