package main

import (
	"designpattern/afactory"
	"designpattern/singleton"
	"fmt"
)

func main() {
	//testAbstractFactory()
	instance := singleton.NewTon()
	instance.SetName("sungbin")
	instance.SetAge(24)

	instance2 := singleton.NewTon()
	fmt.Println(instance2.Name())
	fmt.Println(instance2.Age())

}

func testAbstractFactory() {
	adidasFactory, _ := afactory.GetSportsFactory("adidas")
	adidasShoe := adidasFactory.MakeShoe()
	afactory.PrintShoeDetails(adidasShoe)

	nikeFactory, _ := afactory.GetSportsFactory("nike")
	nikeShoe := nikeFactory.MakeShoe()
	afactory.PrintShoeDetails(nikeShoe)
}
