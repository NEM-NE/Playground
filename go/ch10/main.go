package main

import (
	"fmt"
	"time"
)

func process(val int) int {
	return 3
}

func runThingConcurrently(in <-chan int, out chan<- int) {
	go func() {
		for val := range in {
			result := process(val)
			out <- result
		}
	}()
}

func main() {
	// Unbuffered 채널 생성
	done := make(chan bool, 1)

	fmt.Println("Main start")
	go func() {
		done <- true // 채널이 받은 데이터를 사용하기 전까지 LOCK
		for i := 0; i < 3; i++ {
			fmt.Println("Goroutine1: ", i)
		}
	}()

	time.Sleep(100 * time.Millisecond)
	go func() {
		for i := 0; i < 3; i++ {
			fmt.Println("Goroutine2: ", i)
		}
		<-done
	}()

	time.Sleep(100 * time.Millisecond)
	fmt.Println("Main end")
}
