// src/utils/shapes.js
//
// Draw all shapes (preview + final render)

export default function drawShape(
  ctx,
  start,
  end,
  PIX,
  color,
  type,
  size,
  rows,
  cols,
  preview = false
) {
  const x1 = start.c * PIX;
  const y1 = start.r * PIX;
  const x2 = end.c * PIX;
  const y2 = end.r * PIX;

  const w = x2 - x1;
  const h = y2 - y1;

  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, size / 4);
  ctx.fillStyle = color;

  switch (type) {
    case "square":
      drawSquare(ctx, x1, y1, w, h, preview);
      break;

    case "circle":
      drawCircle(ctx, x1, y1, w, h, preview);
      break;

    case "line":
      drawLine(ctx, x1, y1, x2, y2, preview);
      break;

    case "triangle":
      drawTriangle(ctx, x1, y1, w, h, preview);
      break;

    case "diamond":
      drawDiamond(ctx, x1, y1, w, h, preview);
      break;

    case "arrow":
      drawArrow(ctx, x1, y1, w, h, preview);
      break;

    case "heart":
      drawHeart(ctx, x1, y1, w, h, preview);
      break;

    case "star":
      drawStar(ctx, x1, y1, w, h, preview);
      break;

    default:
      break;
  }
}

/* ==================================================
   SHAPES IMPLEMENTATION
   ================================================== */

function drawSquare(ctx, x, y, w, h, preview) {
  preview ? ctx.strokeRect(x, y, w, h) : ctx.fillRect(x, y, w, h);
}

function drawCircle(ctx, x, y, w, h, preview) {
  ctx.beginPath();
  ctx.ellipse(
    x + w / 2,
    y + h / 2,
    Math.abs(w / 2),
    Math.abs(h / 2),
    0,
    0,
    Math.PI * 2
  );
  preview ? ctx.stroke() : ctx.fill();
}

function drawLine(ctx, x1, y1, x2, y2, preview) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  preview ? ctx.stroke() : ctx.stroke();
}

function drawTriangle(ctx, x, y, w, h, preview) {
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  preview ? ctx.stroke() : ctx.fill();
}

function drawDiamond(ctx, x, y, w, h, preview) {
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h / 2);
  ctx.closePath();
  preview ? ctx.stroke() : ctx.fill();
}

function drawArrow(ctx, x, y, w, h, preview) {
  ctx.beginPath();
  ctx.moveTo(x, y + h / 2);
  ctx.lineTo(x + (w * 0.7), y + h / 2);
  ctx.lineTo(x + (w * 0.7), y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + (w * 0.7), y + h);
  ctx.lineTo(x + (w * 0.7), y + h / 2);
  ctx.closePath();
  preview ? ctx.stroke() : ctx.fill();
}

function drawHeart(ctx, x, y, w, h, preview) {
  ctx.beginPath();
  const topCurveHeight = h * 0.3;
  ctx.moveTo(x + w / 2, y + h);
  ctx.bezierCurveTo(
    x + w / 2 - w / 2,
    y + h - topCurveHeight,
    x,
    y + topCurveHeight,
    x + w / 2,
    y + topCurveHeight * 1.5
  );
  ctx.bezierCurveTo(
    x + w,
    y + topCurveHeight,
    x + w / 2 + w / 2,
    y + h - topCurveHeight,
    x + w / 2,
    y + h
  );
  preview ? ctx.stroke() : ctx.fill();
}

function drawStar(ctx, x, y, w, h, preview) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const spikes = 5;
  const outerRadius = Math.min(w, h) / 2;
  const innerRadius = outerRadius / 2;

  let rot = (Math.PI / 2) * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      cx + Math.cos(rot) * outerRadius,
      cy + Math.sin(rot) * outerRadius
    );
    rot += step;

    ctx.lineTo(
      cx + Math.cos(rot) * innerRadius,
      cy + Math.sin(rot) * innerRadius
    );
    rot += step;
  }

  ctx.closePath();
  preview ? ctx.stroke() : ctx.fill();
}
