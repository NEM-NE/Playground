package main

import (
	"./bank"
	"./myDict"
	"fmt"
)

func main() {
	//account()
	dict()
}

func dict() {
	dictionary := myDict.Dictionary{}
	dictionary["hello"] = "hello"
	fmt.Println(dictionary)
	val, err := dictionary.Search("world")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(val)
	}

	dictionary.Add("world", "world")
	val, err = dictionary.Search("world")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(val)
	}

	dictionary.Update("world", "hello")
	val, err = dictionary.Search("world")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(val)
	}

}

func account() {
	account := bank.NewAccount("sungbin")
	account.Deposit(10)
	fmt.Println(account.Balance())
	err := account.Withdraw(20)
	if err != nil {
		//log.Fatalln(err)
		fmt.Println(err)
	}
	fmt.Println(account)
}
