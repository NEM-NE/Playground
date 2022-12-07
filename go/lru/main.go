package main

import (
	"./cache"
	"fmt"
)

func main() {
	c := cache.NewCache(5)

	c.Put("1", "Hello")
	c.Put("2", "Hello2")
	c.Put("3", "Hello3")
	c.Put("4", "Hello4")
	c.Put("5", "Hello5")

	fmt.Println(c) // Expected result => List : 1-Hello, 2-Hello2, 3-Hello3, 4-Hello4, 5-Hello5,

	c.Put("6", "Hello6")
	fmt.Println(c) // Expected result => List : 2-Hello2, 3-Hello3, 4-Hello4, 5-Hello5, 6-Hello6,
	c.Put("2", "Hello2")
	fmt.Println(c) // Expected result => List : 3-Hello3, 4-Hello4, 5-Hello5, 6-Hello6, 2-Hello2,

	result, _ := c.Get("2")
	fmt.Println(result) // Expected result => 2-Hello2
	fmt.Println(c)      // Expected result => List : 3-Hello3, 4-Hello4, 5-Hello5, 6-Hello6, 2-Hello2,
	result, _ = c.Get("1")
	fmt.Println(result) // Expected result => 1-Hello
	fmt.Println(c)      // Expected result => List : 4-Hello4, 5-Hello5, 6-Hello6, 2-Hello2, 1-Hello,
}
