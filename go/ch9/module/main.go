package main

import (
	"fmt"
	"github.com/nem-ne/playground/go/math"
	"github.com/nem-ne/playground/go/print"
)

func main() {
	num := math.Double(4)
	output := print.Format(num)
	fmt.Println(output)
}
