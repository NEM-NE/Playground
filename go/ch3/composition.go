package main

import "fmt"

func main() {
	//array()
	fmt.Println("Slice Practice")
	//slice()
	//runeAndString()
	mapPractice()
}

func mapPractice() {
	var nilMap map[string]int // map[keyType]valueType
	fmt.Println(nilMap == nil)
	totalWins := map[string]int{}
	fmt.Println(totalWins == nil)
	teams := map[string][]string{
		"Orcas": []string{"test", "b", "c"},
		"Hello": []string{"a", "b", "c"},
	}
	fmt.Println(teams)
	fmt.Println(teams["Orcas"])
	teams["Orcas"] = append(teams["Orcas"], "newValue")
	fmt.Println(teams["Orcas"])
	fmt.Println(len(teams)) // return key size

	newMap := make(map[string][]string, 10)
	fmt.Println(newMap != nil)
}

func runeAndString() {
	var s string = "Hello_World"
	// var char byte = s[6]
	fmt.Println(s[1])   // will print byte value & don't recommend use string by slice, go do recommend use strings, unicode/utf8 library
	fmt.Println(s[1:2]) // will print character value

	var a rune = '가' // if specific character bigger than utc-8 1byte, then Have to use rune & string()
	s = string(a)
	fmt.Println(s)
}

func array() {
	var x [3]int
	fmt.Println(x)
	var y = [3]int{10, 20, 30}
	fmt.Println(y)
	var z = [12]int{1, 2, 3, 5: 6, 7, 8, 10: 100, 15}
	fmt.Println(z)

	var a = [...]int{10, 20, 30}
	fmt.Println(len(a))
	b := [3]int{10, 20, 30}
	fmt.Println(a == b)
}

func slice() {
	var x = []int{10, 20, 30}
	// var z = []int{1, 2, 3, 5: 6, 7, 8, 10: 100, 15}
	var a []int
	fmt.Println(a == nil)

	x = append(x, 4, 5, 6) // 복사본 x 슬라이스를 기반으로 값을 추가후 반환 따라서 다시 할당 해줘야지 적용됨 (call by value)
	fmt.Println(x)

	a = []int{2, 2, 2, 2, 2}
	x = append(x, a...) // return new slice
	fmt.Println(x)
	fmt.Println(len(x))
	fmt.Println(cap(x))

	x = make([]int, 5, 5) // make(type, len, cap)
	fmt.Println(len(x))
	fmt.Println(cap(x))
	fmt.Println(x)
	x = append(x, 10)
	fmt.Println(x)

	x = []int{1, 2, 3, 4}
	y := x[:2] // shallow copy
	z := x[1:]
	d := x[1:3]
	e := x[:]
	fmt.Println("x:", x)
	fmt.Println("y:", y)
	fmt.Println("z:", z)
	fmt.Println("d:", d)
	fmt.Println("e:", e)

	y = x[:2]
	fmt.Println("y:", y)
	x[1] = 999
	fmt.Println("y:", y)
	y = append(y, 30, 40, 50)
	fmt.Println("y:", y)
	x[1] = 2
	fmt.Println("y:", y)

	x = []int{1, 2, 3, 4}
	y = make([]int, 2)
	num := copy(y, x[2:]) // deep copy
	fmt.Println(y, num)
	x = append(x, 999)
	fmt.Println(y, num)

}
