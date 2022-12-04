package myDict

import "errors"

type Dictionary map[string]string

func (d Dictionary) Search(word string) (string, error) {
	val, ok := d[word]
	if !ok {
		return "", errors.New("Not Found Error")
	}

	return val, nil
}

func (d Dictionary) Add(k, v string) error {
	_, err := d.Search(k)

	if err == nil {
		return errors.New("Existed Value")
	} else {
		d[k] = v
	}

	return nil
}

func (d Dictionary) Update(k, v string) error {
	d[k] = v
}
