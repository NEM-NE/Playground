package pubsub

import (
	"crypto/rand"
	"fmt"
	"sync"
)

type Subscriber struct {
	id       string
	messages chan *Message
	topics   map[string]bool
	active   bool
	mutex    sync.RWMutex
}

func CreateNewSubscriber() (string, *Subscriber) {
	id, err := createRandId()
	if err != nil {
		fmt.Println("error:", err)
	}

	sub := &Subscriber{
		id:       id,
		messages: make(chan *Message),
		topics:   map[string]bool{},
		active:   true,
	}

	return id, sub
}

func createRandId() (string, error) {
	b := make([]byte, 10)
	_, err := rand.Read(b)
	if err != nil {
		fmt.Println("error:", err)
		return "", err
	}

	id := fmt.Sprintf("%X-%X", b[0:4], b[4:8])
	return id, nil
}

func (s *Subscriber) AddTopic(topic string) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	s.topics[topic] = true
}

func (s *Subscriber) RemoveTopic(topic string) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	delete(s.topics, topic)
}

func (s Subscriber) Signal(msg *Message) {
	s.mutex.RLock()
	defer s.mutex.RUnlock()

	if s.active {
		s.messages <- msg
	}
}

func (s *Subscriber) Listen() {
	// Listens to the message channel, prints once received.
	for {
		if msg, ok := <-s.messages; ok {
			fmt.Printf("Subscriber %s, received: %s from topic: %s\n", s.id, msg.GetMessageBody(), msg.GetTopic())
		}
	}
}
