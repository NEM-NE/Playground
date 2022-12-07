package cache

import "fmt"

type Node struct {
	key, value  string
	left, right *Node
}

func (n *Node) SetLeft(left *Node) {
	n.left = left
}

func (n *Node) SetRight(right *Node) {
	n.right = right
}

func (n Node) Left() *Node {
	return n.left
}

func (n Node) Right() *Node {
	return n.right
}

func (n Node) Key() string {
	return n.key
}

func (n Node) Value() string {
	return n.value
}

func NewNode(k, v string) Node {
	return Node{
		key:   k,
		value: v,
	}
}

func (n Node) String() string {
	return fmt.Sprintf("%v-%v", n.key, n.value)
}
