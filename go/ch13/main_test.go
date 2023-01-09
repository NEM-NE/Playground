package ch13

import (
	"fmt"
	"os"
	"testing"
	"time"
)

var testTime time.Time

func TestMain(m *testing.M) {
	fmt.Println("Set Up stuff for tests here")
	testTime = time.Now()
	exitVal := m.Run()
	fmt.Println("clean up stuff after tests here")
	os.Exit(exitVal)
}

func TestFirst(t *testing.T) {
	fmt.Println("First Test in TestMain : ", testTime)
}

func TestSecond(t *testing.T) {
	fmt.Println("Second Test in TestMain : ", testTime)
}
