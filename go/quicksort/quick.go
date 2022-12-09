package main

import "fmt"

func main() {

	ary := []int{35, 33, 42, 10, 14, 19, 27, 44, 26, 31}

	quickSort(ary, 0, len(ary)-1)

	fmt.Println(ary)
}

func quickSort(ary []int, start, end int) {
	if start >= end {
		return
	}

	pivot := end
	left := start
	right := end - 1

	for left <= right {
		for right >= start && ary[right] >= ary[pivot] {
			right--
		}

		for left < end && ary[left] <= ary[pivot] {
			left++
		}

		if left > right {
			ary[left], ary[pivot] = ary[pivot], ary[left]
		} else {
			ary[left], ary[right] = ary[right], ary[left]
		}

		quickSort(ary, start, left-1)
		quickSort(ary, left+1, end)
	}
}
