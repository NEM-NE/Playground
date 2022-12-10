package afactory

import (
	"errors"
	"fmt"
)

var (
	ErrNotFoundFactory = errors.New("Not Found Appropriate Factory")
)

type ISportsFactory interface {
	MakeShoe() IShoe
}

type Adidas struct {
}

type Nike struct {
}

type AdidasShoe struct {
	Shoe
}

type NikeShoe struct {
	Shoe
}

func PrintShoeDetails(s IShoe) {
	fmt.Printf("Logo: %s", s.Logo())
	fmt.Println()
	fmt.Printf("Size: %d", s.Size())
	fmt.Println()
}

func GetSportsFactory(brand string) (ISportsFactory, error) {
	switch brand {
	case "adidas":
		return &Adidas{}, nil
	case "nike":
		return &Nike{}, nil
	default:
		return nil, ErrNotFoundFactory
	}
}

func (a *Adidas) MakeShoe() IShoe {
	return &AdidasShoe{
		Shoe: Shoe{
			logo: "adidas",
			size: 14,
		},
	}
}

func (a *Nike) MakeShoe() IShoe {
	return &NikeShoe{
		Shoe: Shoe{
			logo: "nike",
			size: 14,
		},
	}
}
