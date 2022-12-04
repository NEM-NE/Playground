package main

import (
	"fmt"
	"net/http"
	"time"
)

type result struct {
	url    string
	status string
}

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
	c := make(chan result)

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
		go enhanceHitURL(url, c)
	}

	for i := 0; i < len(urls); i++ {
		fmt.Println(<-c)
	}

	fmt.Println(results)
	resultTime := time.Since(start)

	fmt.Println("Execution Time : ", resultTime)
}

func enhanceHitURL(url string, c chan<- result) { // channel only use to send data
	fmt.Println("Checking:", url)
	resp, err := http.Get(url)
	status := "OK"
	if err != nil || resp.StatusCode >= 400 {
		status = "FAILED"
	}
	c <- result{
		status: status,
		url:    url,
	}
}
