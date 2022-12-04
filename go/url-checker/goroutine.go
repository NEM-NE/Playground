package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan string)
	people := [2]string{"nico", "flynn"}
	for _, person := range people {
		go isSexy(person, c)
	}

	result := <-c // 응답이 올 때 까지 기다림
	fmt.Println(result)
	fmt.Println(<-c)
}

func isSexy(person string, c chan string) {
	time.Sleep(time.Second * 5)
	c <- person + "is sexy"
}
