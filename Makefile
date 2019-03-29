.PHONY: test

s:
	@open http://localhost:8080/github.com/kooksee/titles-helper
	@gopherjs serve -m .

commit:
	@git add .