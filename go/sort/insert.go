package main

import "fmt"

func main() {
	ary := []int{7, 6, 2, 4, 3, 9, 1}

	for i := 1; i < len(ary); i++ {
		standard := ary[i]
		index := i - 1

		for index >= 0 && standard < ary[index] {
			ary[index+1] = ary[index]
			index--
		}

		ary[index+1] = standard
		fmt.Println(ary)
	}

	fmt.Println(ary)

}
