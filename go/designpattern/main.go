package main

import (
	"designpattern/adapter"
	"designpattern/afactory"
	"designpattern/singleton"
	"fmt"
)

func main() {
	//testAbstractFactory()
	//testSingleton()

	duck := adapter.Duck{}
	adapter.AdapterTest(duck)

	turkeyAdapter := adapter.TurkeyAdapter{}
	turkey := adapter.Turkey{}
	turkeyAdapter.SetTurkey(turkey)
	adapter.AdapterTest(turkeyAdapter)

}

func testAbstractFactory() {
	adidasFactory, _ := afactory.GetSportsFactory("adidas")
	adidasShoe := adidasFactory.MakeShoe()
	afactory.PrintShoeDetails(adidasShoe)

	nikeFactory, _ := afactory.GetSportsFactory("nike")
	nikeShoe := nikeFactory.MakeShoe()
	afactory.PrintShoeDetails(nikeShoe)
}

func testSingleton() {
	instance := singleton.NewTon()
	instance.SetName("sungbin")
	instance.SetAge(24)

	instance2 := singleton.NewTon()
	fmt.Println(instance2.Name())
	fmt.Println(instance2.Age())
}
