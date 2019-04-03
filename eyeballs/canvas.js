const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

// Rects
// ctx.fillStyle = 'rgba(0, 230, 230, 0.3)'
// ctx.fillRect(120, 150, 400, 30)
// ctx.fillStyle = 'rgba(0, 100, 230, 0.3)'

// ctx.fillRect(300, 200, 30, 330)
// ctx.fillStyle = 'rgba(200, 100, 230, 0.3)'
// ctx.fillRect(180, 100, 220, 130)

// // Lines
// ctx.beginPath()
// ctx.moveTo(50, 300)
// ctx.lineTo(300, 100)
// ctx.lineTo(400, 400)
// ctx.strokeStyle = 'magenta'
// ctx.stroke()

// // Arcs / Circles
// ctx.beginPath()
// ctx.arc(400, 500, 30, 0, Math.PI * 2)
// ctx.strokeStyle = 'green'
// ctx.stroke()

// // Random circles
// for (let n = 0; n < 50; n++) {
//   const r = Math.floor(Math.random() * 100)
//   const x = Math.floor(Math.random() * (canvas.width - 2*r))
//   const y = Math.floor(Math.random() * (canvas.height - 2*r))
//   const a = Math.floor(Math.random() * Math.PI * 2)
//   ctx.beginPath()
//   ctx.arc(x, y, r, 0, a)
//   ctx.fillStyle = 'rgba(30,200,30,0.3)'
//   ctx.fill()
// }

// Animate
const randomRGBA = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const a = Math.random()
  return `rgba(${r},${g},${b},${a})`
}

const randomGradient = (x, y, r, ctx, color) => {
  const gradient = ctx.createRadialGradient(x, y, r / 8, x, y, r)
  gradient.addColorStop(0, 'black')
  gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(1, color)
  return gradient
}

class RandomCircle {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.r = Math.floor(Math.random() * canvas.width / 20) + 50
    this.x = Math.floor(Math.random() * (canvas.width - 2*this.r)) + this.r 
    this.y = Math.floor(Math.random() * (canvas.height - 2*this.r)) + this.r 
    this.speed_multiplier = 1.8
    this.dx = (Math.random() * this.speed_multiplier + 0.1) * this.redirect()
    this.dy = (Math.random() * this.speed_multiplier + 0.1) * this.redirect()
    this.gradientColor = randomRGBA()
    this.fillColor = randomGradient(this.x, this.y, this.r, this.ctx, this.gradientColor)
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.fillColor = randomGradient(this.x, this.y, this.r, this.ctx, this.gradientColor)
    ctx.fillStyle = this.fillColor
    ctx.fill()
  }

  move() {
    if (this.on_edge_x()) {
      this.dx *= -1
      this.gradientColor = randomRGBA()
      this.fillColor = randomGradient(this.x, this.y, this.r, this.ctx, this.gradientColor)
    }
    if (this.on_edge_y()) {
      this.dy *= -1
      this.gradientColor = randomRGBA()
      this.fillColor = randomGradient(this.x, this.y, this.r, this.ctx, this.gradientColor)
    }
    this.x += this.dx
    this.y += this.dy
  }

  on_edge_x() {
    return (((this.x + this.r) > this.canvas.width) || ((this.x - this.r) < 0))
  }

  on_edge_y() {
    return (((this.y + this.r) > this.canvas.height) || ((this.y - this.r) < 0))
  }

  randomize_r() {
    this.r = Math.floor(Math.random() * canvas.width / 50) + 10
  }

  randomize_dx() {
    this.dx = Math.random() * this.speed_multiplier
  }

  randomize_dy() {
    this.dy = Math.random() * this.speed_multiplier
  }

  redirect() {
    const random = Math.floor(Math.random() * 2)
    return random == 0 ? -1 : 1
  }

}

let circles = []
for (let n = 0; n < 10; n++) {
  circles.push(new RandomCircle(canvas))
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let circle of circles) {
    circle.draw()
    circle.move()
    // circle.randomize_r()
  }
  requestAnimationFrame(animate)
}

animate()