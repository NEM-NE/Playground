package main

import (
	"errors"
	"fmt"
)

func main() {
	src := []int{1, 2, 3, 4}

	fmt.Println(addToInts(src, 5, 5, 5, 5))

	fmt.Println(addAll(src, 100))

	fmt.Println(addTo(3))
	fmt.Println(addTo(3, 2))
	fmt.Println(addTo(3, 2, 4, 6, 8))
	a := []int{4, 3}
	fmt.Println(addTo(3, a...))

	result, remainder, err = divAndRemainder(5, 2)
}

func addTo(base int, vals ...int) (out []int) {
	out = make([]int, 0, len(vals))
	for _, v := range vals {
		out = append(out, base+v)
	}
	return
}

func addToInts(src []int, dest ...int) []int {
	return append(src, dest...)
}

func addAll(src []int, num int) []int {
	for i := range src {
		src[i] += num
	}
	return src
}

func divAndRemainder(numerator, denominator int) (int, int, error) {
	if denominator == 0 {
		return 0, 0, errors.New("cannot divide by zero")
	}

	return numerator / denominator, numerator % denominator, nil
}
