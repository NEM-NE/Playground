package pubsub

import (
	"fmt"
	"sync"
)

// key:id value:subscriber
type Subscribers map[string]*Subscriber

type Broker struct {
	subscribers Subscribers            // all subscribers
	topics      map[string]Subscribers // key: topic, value: subscribers about topic
	mut         sync.RWMutex
}

func NewBroker() *Broker {
	return &Broker{
		subscribers: Subscribers{},
		topics:      map[string]Subscribers{},
	}
}

func (b *Broker) AddSubscriber() *Subscriber {
	b.mut.Lock()
	defer b.mut.Unlock()

	id, sub := CreateNewSubscriber()
	b.subscribers[id] = sub

	return sub
}

func (b *Broker) Subscribe(s *Subscriber, topic string) {
	b.mut.Lock()
	defer b.mut.Unlock()

	_, ok := b.topics[topic]
	if !ok {
		b.topics[topic] = Subscribers{}
	}
	s.AddTopic(topic)
	b.topics[topic][s.id] = s
	fmt.Printf("%s Subscribed for topic: %s\n", s.id, topic)
}

func (b *Broker) Unsubscribe(s *Subscriber, topic string) {
	b.mut.Lock()
	defer b.mut.Unlock()

	delete(b.topics[topic], s.id)
	s.RemoveTopic(topic)
	fmt.Printf("%s Unsubscribed for topic: %s\n", s.id, topic)
}

func (b *Broker) RemoveSubscriber(s *Subscriber) {
	b.mut.Lock()
	defer b.mut.Unlock()

	// remove subscriber in subscribers
	delete(b.subscribers, s.id)

	// remove subscriber in topics
	for topic := range s.topics {
		b.Unsubscribe(s, topic)
	}

	fmt.Printf("Remove Subscriber : %v \n", s.id)
}

func (b *Broker) GetSubscribers(topic string) string {
	b.mut.RLock()
	defer b.mut.RUnlock()

	subscribers := b.topics[topic]
	var result string
	for id := range subscribers {
		result += fmt.Sprintf("%v, ", id)
	}
	return result
}

func (b *Broker) Publish(topic, msg string) {
	b.mut.RLock()
	bTopics := b.topics[topic]
	b.mut.RUnlock()
	for _, s := range bTopics {
		m := NewMessage(msg, topic)
		if !s.active {
			return
		}

		go (func(s *Subscriber) {
			s.Signal(m)
		})(s)
	}
}
