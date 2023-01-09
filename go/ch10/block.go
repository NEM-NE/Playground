package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	//ch := make(chan string)
	//go goTest(ch)
	//ch <- "Done!" // 흐름의 제어권을 넘김
	//fmt.Println("Finish!")

	//result
	// 1. done 2. finish

	// 2번째 예시
	var wg sync.WaitGroup
	ch := make(chan int, 2)
	wg.Add(1)
	go calculateSquareArea(&wg, ch)
	ch <- 5
	wg.Wait()
}

func goTest(ch chan string) {
	time.Sleep(time.Second)
	fmt.Println(<-ch)
}

func calculateSquareArea(wg *sync.WaitGroup, ch <-chan int) {
	length := <-ch
	fmt.Println(length * length)
	wg.Done()
	return
}
