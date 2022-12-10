package singleton

var instance Person

type Person struct {
	name string
	age  int
}

func (p *Person) Name() string {
	return p.name
}

func (p *Person) SetName(name string) {
	p.name = name
}

func (p *Person) Age() int {
	return p.age
}

func (p *Person) SetAge(age int) {
	p.age = age
}

func NewTon() *Person {
	if instance == (Person{}) {
		instance = Person{}
		return &instance
	}

	return &instance
}
