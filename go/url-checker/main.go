package main

import (
	"errors"
	"fmt"
	"net/http"
	"time"
)

var errRequestFailed = errors.New("Request Failed")

type resultType map[string]string

func (r resultType) String() string {
	result := ""
	for k, v := range r {
		result += fmt.Sprint(k, " : ", v, "\n")
	}
	return result
}

func main() {
	start := time.Now()
	results := resultType{}

	urls := []string{
		"https://www.naver.com",
		"https://www.google.com",
		"https://www.reddit.com",
		"https://soundcloud.com",
		"https://www.facebook.com",
		"https://www.instargram.com",
		"https://www.github.com",
		"https://nemne.tistory.com",
	}

	for _, url := range urls {
		result := "OK"
		err := hitURL(url)

		if err != nil {
			result = "FAILED"
		}

		results[url] = result
	}

	fmt.Println(results)
	resultTime := time.Since(start)

	fmt.Println("Execution Time : ", resultTime)
}

func hitURL(url string) error {
	fmt.Println("Checking:", url)
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode >= 400 {
		return errRequestFailed
	}
	return nil
}
