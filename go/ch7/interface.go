package main

import "fmt"

type LogicProvider struct{}

func (lp LogicProvider) Process(data string) string {
	return fmt.Sprintf("My name is %s", "sungbin")
}

type Logic interface {
	Process(data string) string
}

type Client struct {
	L Logic
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
