package cache

import (
	"errors"
	"fmt"
)

var (
	errNotFound = errors.New("Not Found Element")
)

type cache struct {
	dll      *DoubleLinkedList
	items    map[string]*Node
	capacity int
}

func NewCache(cap int) cache {
	return cache{
		dll:      &DoubleLinkedList{},
		items:    map[string]*Node{},
		capacity: cap,
	}
}

func (c cache) String() string {
	n := c.dll.Head
	result := "List : "
	for n != nil {
		result += fmt.Sprintf("%v-%v, ", n.Key(), n.Value())
		n = n.Right()
	}

	return result
}

func (c cache) contains(k string) (*Node, error) {
	v, ok := c.items[k]
	if !ok {
		return nil, errNotFound
	}

	return v, nil
}

func (c cache) poll() *Node {
	c.dll.Head.Right().SetLeft(nil)
	pollNode := c.dll.Head
	c.dll.Head = c.dll.Head.Right()

	c.dll.Len--

	return pollNode
}

func (c cache) Remove(key string) *Node {
	n := c.items[key]

	if n.Left() != nil {
		n.Left().SetRight(n.Right())
	} else {
		c.dll.Head = c.dll.Head.Right()
	}

	if n.Right() != nil {
		n.Right().SetLeft(n.Left())
	} else {
		c.dll.Tail = c.dll.Tail.Left()
	}

	c.dll.Len--

	delete(c.items, key)

	return n
}

func (c cache) Get(k string) (*Node, error) {
	_, err := c.contains(k)
	if err != nil {
		return nil, err
	}

	n := c.items[k]
	c.Remove(n.Key())
	c.Put(n.Key(), n.Value())

	return n, err
}

func (c cache) Put(k, v string) {
	n, err := c.contains(k)

	// 중복 키 존재 시 기존 키 빼기
	if err == nil {
		c.Remove(n.Key())
	}

	// capacity 초과 시 head 삭제
	if c.dll.Len == c.capacity {
		c.poll()
	}

	// items에 데이터 넣기 & 데이터 연결하기
	nnode := NewNode(k, v)

	if c.dll.Len != 0 {
		c.dll.Tail.SetRight(&nnode)
		nnode.SetLeft(c.dll.Tail)
	} else {
		// first
		c.dll.Head = &nnode
	}

	c.dll.Len++
	c.dll.Tail = &nnode
	c.items[k] = &nnode

}
