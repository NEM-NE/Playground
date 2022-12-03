package main

import (
	"fmt"
	"math/rand"
)

func main() {

	// basic
	for i := 0; i < 100; i++ {
		fmt.Println(i)
	}

	// while
	sum := 0
	for sum < 100 {
		sum += 1
	}

	// infinity loop
	sum = 0
	for {
		sum++
		if sum < 100 {
			break
		} else {
			continue
		}
	}

	// for-range
	var intAry = [5]int{1, 2, 3, 4, 5}
	for i, v := range intAry {
		fmt.Println(i, v)
	}
	// plz ignore index value
	for _, v := range intAry {
		fmt.Println(v)
	}

	samples := []string{"Hello", "World"}
	for _, v := range samples {
		for i, k := range v {
			fmt.Println(i, k, string(k))
		}
	}

	// map for-range
	mapTest := map[string]string{
		"Hello": "World",
		"Sung":  "bin",
	}

	for k, v := range mapTest {
		fmt.Println(k, v) // randomly
	}

	samples = []string{"my", "name", "is", "sungbinIm", "nice", "meet", "you", "how", "are", "you"}
	for _, v := range samples {
		switch word := len(v); word {
		case 1, 2, 3, 4:
			fmt.Println("Short Word!")
		case 5:
			fmt.Println("hmmm not long~")
		default:
			fmt.Println("too long...")
		}

		//switch word := len(v); {
		//case word <= 4:
		//	fmt.Println("Short Word!")
		//case word == 5:
		//	fmt.Println("hmmm not long~")
		//default:
		//	fmt.Println("too long...")
		//}
	}

	a := rand.Intn(10)
	for a < 100 {
		if a%5 == 0 {
			goto done
		}

		a = a*2 + 1
	}

	fmt.Println("do something when the loop completes normally")
done:
	fmt.Println("do complicated stuff no matter why we left the loop")
	fmt.Println(a)
}
