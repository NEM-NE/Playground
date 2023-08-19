package main

import (
	"errors"
	"fmt"
	"net/http"
)

func LogOutput(message string) {
	fmt.Println(message)
}

type SimpleDataStore struct {
	userData map[string]string
}

func (sds SimpleDataStore) UserNameForID(userID string) (string, bool) {
	name, ok := sds.userData[userID]
	return name, ok
}

func NewSimpleDataStore() SimpleDataStore {
	return SimpleDataStore{
		userData: map[string]string{
			"1": "Fred",
			"2": "Sung",
			"3": "Bin",
		},
	}
}

// 만약 다른 Logger를, 다른 SimpleDataStore를 사용하고 싶다면
// 위 코드들에 종속되지 않게 하고 싶음

// 구조체인 경우
type DataStore interface {
	UserNameForID(userID string) (string, bool)
}

type Logger interface {
	Log(message string)
}

// 함수인 경우

type LoggerAdapter func(message string)

// Logger 인터페이스와 동일한 함수를 가지고 있기 때문에 LoggerAdapter는 Logger로 변환할 수 있다.
func (lg LoggerAdapter) Log(message string) {
	lg(message)
}

type SimpleLogic struct {
	l  Logger
	ds DataStore
}

func (sl SimpleLogic) SayHello(userID string) (string, error) {
	sl.l.Log("in SayHello for " + userID)
	name, ok := sl.ds.UserNameForID(userID)

	if !ok {
		return "", errors.New("Unknown User")
	}

	return name, nil
}

func NewSimpleLogic(l Logger, ds DataStore) SimpleLogic {
	return SimpleLogic{
		l:  l,
		ds: ds,
	}
}

type Logic interface {
	SayHello(userID string) (string, error)
}

type Controller struct {
	l     Logger
	logic Logic
}

func (c Controller) HandleGreeting(w http.ResponseWriter, r *http.Request) {
	c.l.Log("In SayHello")
	userID := r.URL.Query().Get("user_id")
	message, err := c.logic.SayHello(userID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}
	w.Write([]byte(message))
}

func NewController(l Logger, logic Logic) Controller {
	return Controller{
		l:     l,
		logic: logic,
	}
}

func main() {
	l := LoggerAdapter(LogOutput) //LogOutput과 LoggerAdapter의 함수 타입이 동일하기 때문에 변환이 가능하다.
	ds := NewSimpleDataStore()
	logic := NewSimpleLogic(l, ds)
	c := NewController(l, logic)

	http.HandleFunc("/hello", c.HandleGreeting)
	http.ListenAndServe(":8080", nil)
}