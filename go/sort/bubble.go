package main

import "fmt"

func main() {
	ary := []int{7, 6, 2, 4, 3, 9, 1}

	for i := 0; i < len(ary); i++ {
		for j := 0; j < len(ary)-1-i; j++ {
			if ary[j] > ary[j+1] {
				ary[j], ary[j+1] = ary[j+1], ary[j]
			}
		}
	}

	fmt.Println(ary)
}
