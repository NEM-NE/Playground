package main

import "fmt"

func main() {
	test()

}

func test() {
	a := 4

	// 주로 무언가를 close하는 용도로 사용 / closuer를 통해 close해주는 함수들을 만드는 방식으로 활용 가능
	defer func() int {
		fmt.Println("Not Finish : ", a)
		return 3
	}()
	fmt.Println("finish!!")
}
