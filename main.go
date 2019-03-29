package main

import (
	"fmt"
	"github.com/gopherjs/vecty"
	"github.com/gopherjs/vecty/elem"
)

func main() {
	vecty.SetTitle("test bulma")
	vecty.RenderBody(&MainView{
		isShow:    true,
		isTagShow: true,
		isDown:    false,
	})
}

// MainView is the parent level view.
type MainView struct {
	vecty.Core
	isShow    bool
	isTagShow bool
	isDown    bool
}

func (pv *MainView) Mount() {
	fmt.Println("Mount")
}

func (pv *MainView) Render() vecty.ComponentOrHTML {
	fmt.Println("111111")
	return elem.Body()
}
