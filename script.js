// Fungsi untuk menggambar cacing
function drawSnake(ctx, x, y, length) {
    // Gambar kepala cacing
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 20, 20);
  
    // Gambar badan cacing
    for (var i = 1; i < length; i++) {
      ctx.fillStyle = "green";
      ctx.fillRect(x - 20 * i, y, 20, 20);
    }
  }
  
  // Fungsi untuk menggerakkan cacing
  function moveSnake(ctx, x, y, length, direction) {
    // Perbarui posisi cacing
    switch (direction) {
      case "up":
        y--;
        break;
      case "down":
        y++;
        break;
      case "left":
        x--;
        break;
      case "right":
        x++;
        break;
    }
  
    // Periksa apakah cacing menabrak batas layar
    if (x < 0 || x > canvas.width) {
      gameOver(ctx);
    }
    if (y < 0 || y > canvas.height) {
      gameOver(ctx);
    }
  
    // Periksa apakah cacing menabrak dirinya sendiri
    for (var i = 1; i < length; i++) {
      if (x == (length - i) * 20 && y == (i - 1) * 20) {
        gameOver(ctx);
      }
    }
  
    // Gambar cacing
    drawSnake(ctx, x, y, length);
  }
  
  // Fungsi untuk menggambar apel
  function drawApple(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 20, 20);
  }
  
  // Fungsi untuk memeriksa apakah cacing memakan apel
  function checkAppleCollision(ctx, x, y, length, apple) {
    if (x == apple.x && y == apple.y) {
      length++;
      drawApple(ctx);
    }
  }
  
  // Fungsi untuk mengakhiri permainan
  function gameOver(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  }
  
  // Inisialisasi permainan
  var ctx = document.getElementById("canvas").getContext("2d");
  
  // Variabel untuk menyimpan posisi cacing
  var x = 250;
  var y = 250;
  
  // Variabel untuk menyimpan arah cacing
  var direction = "up";
  
  // Variabel untuk menyimpan panjang cacing
  var length = 1;
  
  // Variabel untuk menyimpan posisi apel
  var apple = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
  };
  
  // Gambar cacing
  drawSnake(ctx, x, y, length);
  
  // Gambar apel
  drawApple(ctx);
  
  // Event loop
  setInterval(function() {
    // Gerak cacing
    moveSnake(ctx, x, y, length, direction);
  
    // Periksa apakah cacing memakan apel
    checkAppleCollision(ctx, x, y, length, apple);
  }, 20);