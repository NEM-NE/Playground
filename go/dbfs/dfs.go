package main

import (
	"bufio"
	"fmt"
	"os"
)

var (
	graph   [][]int
	visited []bool
	writer  *bufio.Writer
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer = bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	var n, m, v int
	fmt.Fscanln(reader, &n, &m, &v)

	graph = make([][]int, n+1)
	for i := range graph {
		graph[i] = make([]int, n+1)
	}

	visited = make([]bool, n+1)

	for i := 0; i < m; i++ {
		var a, b int
		fmt.Fscanln(reader, &a, &b)

		graph[a][b] = 1
		graph[b][a] = 1
	}

	dfs(v)
	fmt.Fprintln(writer, "")
	visited = make([]bool, n+1)
	bfs(v)
}

func dfs(num int) {
	visited[num] = true
	fmt.Fprintf(writer, "%d ", num)

	for i := 0; i < len(graph[num]); i++ {
		if graph[num][i] == 1 && !visited[i] {
			dfs(i)
		}
	}
}

func bfs(num int) {
	visited[num] = true
	queue := []int{}

	queue = append(queue, num)

	for len(queue) != 0 {
		v := queue[0]
		fmt.Fprintf(writer, "%d ", v)

		queue = queue[1:]
		for i := 0; i < len(graph[v]); i++ {
			if graph[v][i] == 1 && !visited[i] {
				visited[i] = true
				queue = append(queue, i)
			}
		}

	}
}
