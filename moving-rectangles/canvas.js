const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

class Rectangle {
  constructor(canvas, x, y, w, h, fill) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.dw = -0.8
    this.dh = 0.8
    this.dx = Math.floor((Math.random() + 1) * 1.1) * this.direction()
    this.dy = Math.floor((Math.random() + 1) * 1.1) * this.direction()
    this.fill = fill
  }

  draw() {
    this.ctx.fillStyle = this.fill
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  move() {
    if (this.on_east_edge()) {
      this.x = -this.w
    }
    if (this.on_west_edge()) {
      this.x = this.canvas.width
    }
    if (this.on_north_edge()) {
      this.y = this.canvas.height
    }
    if (this.on_south_edge()) {
      this.y = -this.h
    }
    this.reshape()
    this.x += this.dx
    this.y += this.dy
  }

  reshape() {
    if (this.w < 1 || this.w / this.h > 0.9) {
      this.dw *= -1
    }
    if (this.h < 1 || this.h / this.w > 0.9) {
      this.dh *= -1
    }
    this.w += this.dw
    this.h += this.dh
  }

  on_east_edge() {
    if (this.dx > 0) {
      return this.x > this.canvas.width
    }
    return false
  }

  on_west_edge() {
    if (this.dx < 0) {
      return (this.x + this.w) < 0
    }
  }

  on_north_edge() {
    if (this.dy < 0) {
      return (this.y + this.h) < 0
    }
    return false
  }

  on_south_edge() {
    if (this.dy > 0) {
      return this.y > this.canvas.height
    }
    return false
  }
  on_edge_y() {
    return ((this.y + this.h <= 0) || ((this.y) >= this.canvas.height))
  }

  direction() {
    return Math.random() > 0.5 ? 1 : -1
  }
}

const randomRGBA = () => {
  const min = 100
  const r = Math.floor(min + Math.random() * (255 - min))
  const g = Math.floor(min + Math.random() * (255 - min))
  const b = Math.floor(min + Math.random() * (255 - min))
  const a = 0.3 + Math.random() * 0.4
  return `rgba(${r},${g},${b},${a})`
}

let rectangles = []
for (let n = 0; n < 40; n++) {
  let w = Math.floor(Math.random() * 300 + 20),
      h = Math.floor(Math.random() * 300 + 20),
      x = Math.abs(Math.floor(Math.random() * canvas.width * 2)),
      y = Math.abs(Math.floor(Math.random() * canvas.height * 2)),
      fill = randomRGBA()
  rectangles.push(new Rectangle(canvas, x, y, w, h, fill))
}

// const rect = new Rectangle(canvas, x, y, w, h, 'cyan')
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let rectangle of rectangles) {
    rectangle.draw()
    rectangle.move()
  }
  requestAnimationFrame(animate)
}

animate()