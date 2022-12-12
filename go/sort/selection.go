package main

import "fmt"

func main() {
	ary := []int{7, 6, 2, 4, 3, 9, 1}

	for i := 0; i < len(ary); i++ {
		standard := i
		for j := i + 1; j < len(ary); j++ {
			if ary[standard] > ary[j] {
				standard = j
			}
		}

		ary[i], ary[standard] = ary[standard], ary[i]
	}

	fmt.Println(ary)
}
