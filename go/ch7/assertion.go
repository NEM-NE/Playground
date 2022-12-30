package main

import (
	"fmt"
	"go/types"
)

type MyInt int

func main() {
	var i interface{} // empty interface can assign any type
	var mine MyInt = 20
	i = mine
	i2, ok := i.(int)

	if ok {
		fmt.Println(i2)
	}
	doThings(i2)
}

func doThings(i interface{}) {
	switch i.(type) {
	case types.Nil:
		fmt.Println("Nil")
	case MyInt:
		fmt.Println("MyInt")
	case int:
		fmt.Println("INT")
	}
}
