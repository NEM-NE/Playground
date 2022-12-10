package afactory

type IShoe interface {
	Logo() string
	SetLogo(logo string)
	Size() int
	SetSize(size int)
}

type Shoe struct {
	logo string
	size int
}

func (s Shoe) Logo() string {
	return s.logo
}

func (s *Shoe) SetLogo(logo string) {
	s.logo = logo
}

func (s Shoe) Size() int {
	return s.size
}

func (s *Shoe) SetSize(size int) {
	s.size = size
}
