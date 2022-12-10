package adapter

import "fmt"

type IDuck interface {
	quack()
	fly()
}

type Duck struct {
}

func (d Duck) quack() {
	fmt.Println("Duck Quack!")
}

func (d Duck) fly() {
	fmt.Println("Duck Fly!")
}
