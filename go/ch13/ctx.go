package main

import (
	"context"
	"fmt"
)

func logic(ctx context.Context, info string) (string, error) {
	return "", nil
}

func main() {
	ctx := context.Background()
	result, err := logic(ctx, "a string")
	fmt.Println(ctx)
}
