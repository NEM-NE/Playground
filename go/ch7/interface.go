package main

import "fmt"

type LogicProvider struct{}

func (lp LogicProvider) Process(data string) string {
	return fmt.Sprintf("My name is %s", "sungbin")
}

type Logic2 interface {
	Process(data string) string
}

type Client struct {
	L Logic2
}

func (c Client) Program() {
	c.L.Process("data")
}

func main() {
	c := Client{
		L: LogicProvider{},
	}

	c.Program()
}
