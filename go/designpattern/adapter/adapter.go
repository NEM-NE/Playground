package adapter

import "fmt"

type TurkeyAdapter struct {
	turkey *Turkey
}

func (t *TurkeyAdapter) SetTurkey(turkey Turkey) {
	t.turkey = &turkey
}

func (t TurkeyAdapter) quack() {
	t.turkey.gobbled()
}

func (t TurkeyAdapter) fly() {
	t.turkey.fly()
}

func AdapterTest(duck IDuck) {
	fmt.Println("start quck!")
	duck.quack()

	fmt.Println("start fly!")
	duck.fly()
}
