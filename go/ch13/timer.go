package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx := context.Background()
	parent, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	child, cancel2 := context.WithTimeout(parent, 3*time.Second)
	defer cancel2()

	start := time.Now()
	<-child.Done()
	end := time.Now()
	fmt.Println(end.Sub(start)) // 자식 컨텍스트는 타임아웃을 3초로 설정했지만 부모 컨텍스트가 타임아웃이 2초로 설정되어있기 때문에 2초 후 종료된다.
}
