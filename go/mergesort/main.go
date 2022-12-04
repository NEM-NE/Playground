package main

import "fmt"

func main() {
	ary := []int{21, 10, 12, 20, 25, 13, 15, 22}
	result := mergeSort(ary)
	fmt.Println(result)
}

func mergeSort(ary []int) []int {
	return divide(ary)
}

func divide(ary []int) []int {
	half := len(ary) / 2

	switch size := len(ary); size {
	case 2:
		if ary[0] < ary[1] {
			return []int{ary[0], ary[1]}
		} else {
			return []int{ary[1], ary[0]}
		}
	case 1:
		return []int{ary[0]}
	}

	a := divide(ary[:half])
	b := divide(ary[half:])

	return merge(a, b)
}

func merge(a, b []int) []int {
	result := []int{}

	idxA := 0
	idxB := 0

	for idxA < len(a) && idxB < len(b) && len(result) < len(a)+len(b) {
		if a[idxA] < b[idxB] {
			result = append(result, a[idxA])
			idxA++
		} else {
			result = append(result, b[idxB])
			idxB++
		}
	}

	for idxA < len(a) {
		result = append(result, a[idxA])
		idxA++
	}

	for idxB < len(b) {
		result = append(result, b[idxB])
		idxB++
	}

	return result
}
