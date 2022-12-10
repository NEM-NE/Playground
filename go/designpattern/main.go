package main

import (
	"designpattern/afactory"
)

func main() {
	adidasFactory, _ := afactory.GetSportsFactory("adidas")
	adidasShoe := adidasFactory.MakeShoe()
	afactory.PrintShoeDetails(adidasShoe)

	nikeFactory, _ := afactory.GetSportsFactory("nike")
	nikeShoe := nikeFactory.MakeShoe()
	afactory.PrintShoeDetails(nikeShoe)
}
