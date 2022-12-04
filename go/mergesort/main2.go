package main

import "fmt"

var temp []int

func main() {
	ary := []int{4, 77, 12, 34, 1, 67, 4, 20, 3, 2, 7, 5, 10}
	temp = make([]int, len(ary))

	myMergeSort(ary, 0, len(ary)-1)

	fmt.Println(ary)
}

func myMergeSort(ary []int, start, end int) {
	if start < end {
		mid := (start + end) / 2
		myMergeSort(ary, start, mid)
		myMergeSort(ary, mid+1, end)
		sort(ary, start, mid, end)
	}
}

func sort(ary []int, start, mid, end int) {
	l := start
	r := mid + 1
	idx := start

	for l <= mid && r <= end {
		if ary[l] < ary[r] {
			temp[idx] = ary[l]
			l++
		} else {
			temp[idx] = ary[r]
			r++
		}
		idx++
	}

	for l <= mid {
		temp[idx] = ary[l]
		idx++
		l++
	}

	for r <= end {
		temp[idx] = ary[r]
		idx++
		r++
	}

	for i := start; i < idx; i++ {
		ary[i] = temp[i]
	}
}
