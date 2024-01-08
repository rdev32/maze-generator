class MapGenerator {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = this.generateMap()
  }

  generateMap() {
    const map = Array.from({ length: this.rows }, () => Array(this.cols).fill('#'))

    const startRow = Math.floor(Math.random() * this.rows)
    const startCol = 0
    const endRow = Math.floor(Math.random() * this.rows)
    const endCol = this.cols - 1

    map[endRow][endCol] = 'E'
    this.depthFirstSearch(map, startRow, startCol)
    map[startRow][startCol] = 'S'

    return map
  }

  depthFirstSearch(map, row, col) {
    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]

    map[row][col] = ' '

    directions.sort(() => Math.random() - 0.5)

    for (const [dx, dy] of directions) {
      const newRow = row + 2 * dx
      const newCol = col + 2 * dy

      if (this.isValid(newRow, newCol) && map[newRow][newCol] === '#') {
        map[row + dx][col + dy] = ' '
        this.depthFirstSearch(map, newRow, newCol)
      }
    }
  }

  isValid(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
  }
}

class Map {
  constructor() {
    this.sprite = new Image()
    /* [
      ['#', '#', '#', ' ', '#', '#', '#', '#', '#'],
      ['#', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#'],
      ['#', ' ', '#', '#', '#', ' ', '#', ' ', '#'],
      ['#', ' ', ' ', ' ', ' ', ' ', '#', ' ', '#'],
      ['#', '#', '#', '#', '#', '#', '#', ' ', '#'],
      ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
      ['#', ' ', '#', '#', '#', '#', '#', '#', '#'],
      ['#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#'],
      ['#', '#', '#', '#', '#', ' ', ' ', '#', '#'],
      ['#', '#', '#', '#', '#', '#', ' ', ' ', '#'],
    ]
    */
    this.data = new MapGenerator(18, 18).data
    this.title = 'untitled'
    this.blockSize = 50
    this.canvas = document.getElementById('mapCanvas')
    this.ctx = this.canvas.getContext('2d')
  }

  render() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] === 'S') {
          this.ctx.fillStyle = '#00ff00'
        } 

        else if (this.data[i][j] === 'E') {
          this.ctx.fillStyle = '#ff0000'
        }

        else if (this.data[i][j] === '#') {
          this.ctx.fillStyle = '#111'
        } else {
          this.ctx.fillStyle = '#fff'
        }

        this.ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize)
      }
    }
  }
}

window.addEventListener('load', () => {
  const map = new Map()
  map.render()
})
