package adapter

import "fmt"

type Turkey struct {
}

func (t Turkey) gobbled() {
	fmt.Println("Turkey Gobbled")
}

func (t Turkey) fly() {
	fmt.Println("Turkey Fly")
}
