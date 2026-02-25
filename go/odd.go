package main

import "fmt"

func main() {
	var num int = 20
	if num%2 == 0 {
		fmt.Println(num, "is even")
	} else {
		fmt.Println(num, "is odd")
	}
}
