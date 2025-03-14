import React, { useEffect, useRef, useState } from "react";
import styles from "./GameCanvas.module.css"; 
const GameCanvas = () => {
  const canvasRef = useRef(null);
  const scoreRef = useRef(0);
  const birdY = useRef(window.innerHeight / 2);
  const velocity = useRef(0);
  const gameRunning = useRef(true);
  const pipes = useRef([]);

  const gravity = 0.05;
  const jump = -3.2;
  const pipeGap = window.innerHeight / 4;
  const pipeWidth = 80;
  const pipeSpeed = 3;
  const pipeSpacing = window.innerWidth / 3;

  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const handleJump = (event) => {
      if (event.type === "click" || event.code === "KeyH") {
        if (!isGameOver) {
          velocity.current = jump;
        } else {
          restartGame();
        }
      }
    };

    document.addEventListener("keydown", handleJump);

    function createPipe() {
      let lastPipe = pipes.current[pipes.current.length - 1];
      if (!lastPipe || lastPipe.x < canvas.width - pipeSpacing) {
        let minHeight = 50;
        let maxHeight = canvas.height - pipeGap - minHeight;
        let topPipeHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        pipes.current.push({
          x: canvas.width,
          y: topPipeHeight,
          passed: false,
        });
      }

      setTimeout(createPipe, 2000);
    }

    function update() {
      if (!gameRunning.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(canvas.width / 6, birdY.current, 20, 0, Math.PI * 2);
      ctx.fill();

      velocity.current += gravity;
      birdY.current += velocity.current;

      pipes.current.forEach((pipe, index) => {
        pipe.x -= pipeSpeed;

        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);

        if (
          (canvas.width / 6 > pipe.x &&
            canvas.width / 6 < pipe.x + pipeWidth &&
            (birdY.current < pipe.y || birdY.current > pipe.y + pipeGap)) ||
          birdY.current > canvas.height
        ) {
          setIsGameOver(true);
          gameRunning.current = false;
        }

        if (!pipe.passed && pipe.x + pipeWidth < canvas.width / 6) {
          pipe.passed = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
        }

        if (pipe.x < -pipeWidth) {
          pipes.current.splice(index, 1);
        }
      });

      if (gameRunning.current) requestAnimationFrame(update);
    }

    function restartGame() {
      birdY.current = canvas.height / 2;
      velocity.current = 0;
      pipes.current = [];
      scoreRef.current = 0;
      setScore(0);
      setIsGameOver(false);
      gameRunning.current = true;
      createPipe();
      update();
    }

    if (gameStarted) {
      createPipe();
      update();
    }

    return () => {
      document.removeEventListener("keydown", handleJump);
    };
  }, [isGameOver, gameStarted]);

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.score}>Score: {score}</h2>

      {!gameStarted && (
        <button className={styles.startButton} onClick={() => setGameStarted(true)}>
          Chơi Ngay
        </button>
      )}

      {isGameOver && (
        <div className={styles.gameOver}>
          <h3>Game Over!</h3>
          <h3>Điểm của bạn: {score}</h3>
          <button className={styles.restartButton} onClick={() => setGameStarted(true)}>
            Chơi Lại
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
};

export default GameCanvas;
